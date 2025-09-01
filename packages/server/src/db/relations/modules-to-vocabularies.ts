import { relations } from "drizzle-orm";

import {
  modulesTable,
  modulesToVocabulariesTable,
  vocabulariesTable,
} from "../tables";

export const modulesToVocabulariesRelations = relations(
  modulesToVocabulariesTable,
  ({ one }) => ({
    module: one(modulesTable, {
      fields: [modulesToVocabulariesTable.moduleId],
      references: [modulesTable.id],
    }),
    vocabulary: one(vocabulariesTable, {
      fields: [modulesToVocabulariesTable.vocabularyId],
      references: [vocabulariesTable.id],
    }),
  }),
);
