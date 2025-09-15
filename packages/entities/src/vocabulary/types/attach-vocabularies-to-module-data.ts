import { z } from "zod";

export const attachVocabulariesToModuleDataSchema = z.object({
  moduleId: z.number(),
  vocabulariesId: z.number().array(),
});

export type AttachVocabulariesToModuleDataSchemaInfer = z.infer<
  typeof attachVocabulariesToModuleDataSchema
>;
