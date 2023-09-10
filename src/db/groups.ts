import { db } from "@/db";
import { eq } from "drizzle-orm";
import { type Session } from "next-auth";
import { groups, users, usersToGroups } from "./schema";

export async function createGroupForUser(
  newGroup: typeof groups.$inferInsert,
  user: typeof users.$inferSelect
) {
  await db.transaction(async (tx) => {
    const newGroupResult = await tx.insert(groups).values(newGroup).returning();

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
}

export async function getGroupsForSession(session: Session) {
  const email = session.user?.email;
  if (!email) {
    throw new Error("Requires and email in the user object");
  }

  const usersGroups = await db
    .select({
      id: groups.id,
      description: groups.description,
      name: groups.name,
    })
    .from(users)
    .fullJoin(usersToGroups, eq(users.id, usersToGroups.userId))
    .fullJoin(groups, eq(groups.id, usersToGroups.groupId))
    .where(eq(users.email, email));
  return usersGroups;
}
