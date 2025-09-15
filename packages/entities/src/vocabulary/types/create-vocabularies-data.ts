import { z } from "zod";

import { vocabularySchema } from "./vocabulary";

export const createVocabulariesDataSchema = z.array(
  vocabularySchema.pick({
    word: true,
    translation: true,
  }),
);

export type CreateVocabulariesDataSchemaInfer = z.infer<
  typeof createVocabulariesDataSchema
>;
