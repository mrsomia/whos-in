import { db } from "@/db";
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
