import { z } from 'zod'
import { auth } from "$/lib/lucia"
import { otpToken } from "$/lib/lucia";
import { db } from '$/db/db';
import { authUser } from '$/db/schema';
import { eq } from "drizzle-orm"
import { redirect } from 'next/navigation';

function sendEmail(email: string, {
  otp
} :{
  otp: string
}) {
  console.log({ email, otp })
}

export async function POST(request: Request) {
  const body = await request.json()
  let email: string
  try {
    email = z.string().email().parse(body.email)
  } catch (e) {
    return new Response(JSON.stringify({ message: "Failed to parse"}), { 
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  
  // Find user
  let user
  user = await db.select({
    userId: authUser.id,
    email: authUser.email,
  }).from(authUser).where(eq(authUser.email, email))
  
  user = user.length ? user[0] : null

  if (!user) {
    // Create user
    user = await auth.createUser({
    primaryKey: null,
    attributes: {
      email,
    },
  })

  }

  console.log(user)

  // create a single use token
  const otp = await otpToken.issue(user.userId);

  sendEmail(email, {
    otp: otp.toString()
  });
  
  redirect(`/signin/${user.userId}/code`)
}
