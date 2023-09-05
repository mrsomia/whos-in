"use server";

import { db } from "@/db";
import { groups, users, usersToGroups } from "@/db/schema";
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
  console.log({ newGroup });
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

  await db.transaction(async (tx) => {
    const newGroupResult = await tx
      .insert(groups)
      .values({ name: parsed.groupName, description: parsed.description })
      .returning();

    const createdGroup = newGroupResult.at(0);

    if (!createdGroup) {
      tx.rollback();
      return;
    }

    await tx.insert(usersToGroups).values({
      userId: user.id,
      groupId: createdGroup.id,
      role: "ADMIN",
    });
  });

  redirect("/dashboard");
}
