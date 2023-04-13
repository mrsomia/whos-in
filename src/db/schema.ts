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
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";
import { InferModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
