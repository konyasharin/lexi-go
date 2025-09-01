import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const vocabulariesTable = pgTable("vocabularies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  word: varchar({ length: 255 }).notNull(),
  translation: varchar({ length: 255 }).notNull(),
});
