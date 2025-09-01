import { relations } from "drizzle-orm";

import { modulesToVocabulariesTable, vocabulariesTable } from "../tables";

export const vocabulariesRelations = relations(
  vocabulariesTable,
  ({ many }) => ({
    modulesToVocabularies: many(modulesToVocabulariesTable),
  }),
);
