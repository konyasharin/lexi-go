import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { usersTable } from "./users";

export const modulesTable = pgTable("modules", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
});
