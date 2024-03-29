"use server";

import { db } from "@/db";
import { createGroupForUser } from "@/db/groups";
import { users } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const createGroupSchema = z.object({
  groupName: z.string(),
  description: z.string().optional(),
});

export async function createGroup(newGroup: unknown) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("unauthenticated");
  }
  if (!session.user?.email) {
    throw new Error("could not find user email");
  }

  const parsed = createGroupSchema.parse(newGroup);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user?.email))
    .limit(1);

  if (!user) {
    throw new Error("Unable to find user in DB, with their email");
  }

  await createGroupForUser(
    { name: parsed.groupName, description: parsed.description },
    user
  );

  redirect("/dashboard");
}
