import { relations } from "drizzle-orm";

import {
  modulesTable,
  modulesToVocabularies,
  vocabulariesTable,
} from "../tables";

export const modulesToVocabulariesRelations = relations(
  modulesToVocabularies,
  ({ one }) => ({
    module: one(modulesTable, {
      fields: [modulesToVocabularies.moduleId],
      references: [modulesTable.id],
    }),
    vocabulary: one(vocabulariesTable, {
      fields: [modulesToVocabularies.vocabularyId],
      references: [vocabulariesTable.id],
    }),
  }),
);
