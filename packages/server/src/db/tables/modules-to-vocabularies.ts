import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { modulesTable } from "./modules";
import { vocabulariesTable } from "./vocabularies";

export const modulesToVocabulariesTable = pgTable(
  "modules_to_vocabularies",
  {
    moduleId: integer("module_id")
      .notNull()
      .references(() => modulesTable.id, { onDelete: "cascade" }),
    vocabularyId: integer("vocabulary_id")
      .notNull()
      .references(() => vocabulariesTable.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.moduleId, t.vocabularyId] })],
);
