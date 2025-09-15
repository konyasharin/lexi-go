import { z } from "zod";

import { createVocabulariesDataSchema } from "./create-vocabularies-data";

export const createVocabulariesWithAttachDataSchema = z.object({
  vocabularies: createVocabulariesDataSchema,
  moduleId: z.number(),
});

export type CreateVocabulariesWithAttachDataSchemaInfer = z.infer<
  typeof createVocabulariesWithAttachDataSchema
>;
