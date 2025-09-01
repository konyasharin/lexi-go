import { drizzle } from "drizzle-orm/postgres-js";

import "dotenv/config";

import * as schema from "./schema";

export * from "./schema";

export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
});

export type DatabaseType = typeof db;
export type TransactionType = Parameters<
  Parameters<DatabaseType["transaction"]>[0]
>[0];
