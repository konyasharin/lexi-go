import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { modulesTable } from "./modules";
import { vocabulariesTable } from "./vocabularies";

export const modulesToVocabularies = pgTable(
  "modules_to_vocabularies",
  {
    moduleId: integer("module_id")
      .notNull()
      .references(() => modulesTable.id),
    vocabularyId: integer("vocabulary_id")
      .notNull()
      .references(() => vocabulariesTable.id),
  },
  (t) => [primaryKey({ columns: [t.moduleId, t.vocabularyId] })],
);
