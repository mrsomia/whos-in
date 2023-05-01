import {
  bigint,
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const authUser = pgTable("auth_user", {
  id: varchar("id", {
    length: 15, // change this when using custom user ids
  }).primaryKey(),
  // other user attributes
  email: varchar("email", { length: 256 }).notNull(),
});

export const session = pgTable("auth_session", {
  id: varchar("id", { length: 128 }).primaryKey(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => authUser.id),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
});

export const key = pgTable("auth_key", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 15 })
    .notNull()
    .references(() => authUser.id),
  primaryKey: boolean("primary_key").notNull(),
  expiresAt: bigint("expires", { mode: "number" }),
  hashedPassword: varchar("hashed_password", { length: 255 }),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  authId: varchar("auth_user_id").references(() => authUser.id),
  fullName: text("full_name").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// do you need a users to events table?
// comms is likely best for the whole group
// but to track who is in for an event and who is out?
// Also to track the order with which they respond/timestamp?

export const usersGoingToEvent = pgTable("users_going_to_event", {
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  eventId: uuid("event_id").references(() => events.id, {
    onDelete: "cascade",
  }),
  confirmedAt: timestamp("confirmed_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey(),
  groupId: uuid("group_id")
    .references(() => groups.id)
    .notNull(),
  name: text("name").notNull(),
  happensAt: timestamp("happens_at").notNull(),
  sendCommsAt: timestamp("send_comms_at"),
});

export const groups = pgTable("groups", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const roleEnum = pgEnum("role", ["member", "admin", "owner"]);

export const usersToGroups = pgTable("users_to_groups", {
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  groupId: uuid("group_id").references(() => groups.id, {
    onDelete: "cascade",
  }),
  role: roleEnum("role").notNull(),
});
