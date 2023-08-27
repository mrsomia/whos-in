import type { AdapterAccount } from "@auth/core/adapters";
import { createId } from "@paralleldrive/cuid2";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const events = pgTable("events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  groupId: text("group_id").references(() => groups.id, {
    onDelete: "cascade",
  }),
  happensAt: timestamp("happens_at", { mode: "date" }).defaultNow().notNull(),
  sendCommsAt: timestamp("send_comms_at", { mode: "date" }),
});

export const usersGoingToEvent = pgTable(
  "usersGoingToEvents",
  {
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    eventId: text("event_id").references(() => events.id, {
      onDelete: "cascade",
    }),
    confirmedAt: timestamp("confirmed_at", { mode: "date" }).defaultNow(),
  },
  (usersGoingToEvent) => ({
    compoundId: primaryKey(usersGoingToEvent.userId, usersGoingToEvent.eventId),
  })
);

export const groups = pgTable("groups", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  description: text("description"),
});

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);

export const usersToGroups = pgTable(
  "users_to_groups",
  {
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    groupId: text("group_id").references(() => groups.id, {
      onDelete: "cascade",
    }),
    role: roleEnum("role"),
  },
  (usersToGroups) => ({
    compoundId: primaryKey(usersToGroups.userId, usersToGroups.groupId),
  })
);
