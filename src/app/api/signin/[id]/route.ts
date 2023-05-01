import { db } from "$/db/db";
import { authUser } from "$/db/schema";
import { auth, otpToken } from "$/lib/lucia";
import { LuciaTokenError } from "@lucia-auth/tokens";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function POST(request: Request) {
  const body = await request.json();
  let code: string;
  let id: string;
  try {
    code = z.string().parse(body.code);
  } catch (e) {
    return new Response(JSON.stringify({ message: "Failed to parse code" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    id = z.string().parse(body.userId);
  } catch (e) {
    return new Response(JSON.stringify({ message: "Failed to parse id" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  console.log({ userId: id, code });

  // Find user
  let user;
  user = await db
    .select({
      userId: authUser.id,
      email: authUser.email,
    })
    .from(authUser)
    .where(eq(authUser.id, id));

  user = user.length ? user[0] : null;

  if (!user) {
    return new Response(JSON.stringify({ message: "Failed to parse code" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // TODO: Remove
  console.log(user);

  const headers = new Headers();
  const authRequest = auth.handleRequest(request, headers);
  // ...

  try {
    console.log("authorising");
    const token = await otpToken.validate(code, user.userId);
    const session = await auth.createSession(user.userId);
    console.log({ session });
    authRequest.setSession(session);

    // make sure to invalidate the session
    // if you're updating important user attributes (like passwords)!
  } catch (e) {
    if (e instanceof LuciaTokenError && e.message === "EXPIRED_TOKEN") {
      console.log("EXPIRED_TOKEN");
      // expired password
      // generate new password and send new email
    }
    if (e instanceof LuciaTokenError && e.message === "INVALID_TOKEN") {
      // invalid password
      console.log("INVALID_TOKEN");
    }
    console.error(e);
  }

  console.log({ headers });
  console.log("\n");

  const response = new Response(null, {
    headers,
  });
  console.log({ response });

  return response;
}
