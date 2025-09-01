import { z } from "zod";

export const vocabularySchema = z.object({
  id: z.number(),
  word: z.string(),
  translation: z.string(),
});

export const createVocabulariesSchema = z.array(
  vocabularySchema.pick({
    word: true,
    translation: true,
  }),
);

export const attachVocabulariesToModuleSchema = z.object({
  moduleId: z.number(),
  vocabulariesId: z.number().array(),
});

export const createVocabulariesWithAttachSchema = z.object({
  vocabularies: createVocabulariesSchema,
  moduleId: z.number(),
});

export type VocabularySchemaInfer = z.infer<typeof vocabularySchema>;
export type CreateVocabulariesSchemaInfer = z.infer<
  typeof createVocabulariesSchema
>;
export type AttachVocabulariesToModuleSchemaInfer = z.infer<
  typeof attachVocabulariesToModuleSchema
>;
export type CreateVocabulariesWithAttachSchemaInfer = z.infer<
  typeof createVocabulariesWithAttachSchema
>;
