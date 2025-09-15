import { z } from "zod";

export const deleteVocabulariesDataSchema = z.object({
  vocabulariesId: z.number().array(),
});

export type DeleteVocabulariesDataSchemaInfer = z.infer<
  typeof deleteVocabulariesDataSchema
>;
