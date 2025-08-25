import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { modulesTable } from "./modules";

export const vocabulariesTable = pgTable("vocabularies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  moduleId: integer("module_id")
    .notNull()
    .references(() => modulesTable.id),
  word: varchar({ length: 255 }).notNull(),
  translation: varchar({ length: 255 }).notNull(),
});
