import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
const queryClient = postgres(connectionString);
export const db: PostgresJsDatabase = drizzle(queryClient);
