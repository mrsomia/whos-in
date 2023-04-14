import { eq } from "drizzle-orm/expressions";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  integer,
  pgTable,
  serial,
	uuid,
  text,
  timestamp,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";
import { InferModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
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
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  eventId: uuid("event_id").references(() => events.id).notNull(),
})

export const events = pgTable("events", {
  id: uuid("id").primaryKey(),
  groupId: uuid("group_id").references(() => groups.id).notNull(),
  name: text("name").notNull(),
  happensAt: timestamp("happens_at").notNull(),
  sendCommsAt: timestamp("send_comms_at"),
})

export const groups = pgTable("groups", {
  id: uuid("id").primaryKey(),
})

const roleEnum = pgEnum('role', ['member', 'admin', 'owner']);

export const usersToGroups = pgTable("users_to_groups", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  groupId: uuid("group_id").references(() => groups.id).notNull(),
  role: roleEnum("role").notNull(),
})

