import { z } from "zod";

export const vocabularySchema = z.object({
  id: z.number(),
  word: z.string(),
  translation: z.string(),
});

export type VocabularySchemaInfer = z.infer<typeof vocabularySchema>;
