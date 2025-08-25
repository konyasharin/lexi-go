import { relations } from "drizzle-orm";

import { modulesToVocabularies, vocabulariesTable } from "../tables";

export const vocabulariesRelations = relations(
  vocabulariesTable,
  ({ many }) => ({
    modulesToVocabularies: many(modulesToVocabularies),
  }),
);
