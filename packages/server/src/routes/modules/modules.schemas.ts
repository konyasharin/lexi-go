import { z } from "zod";

import { createTagsSchema } from "@/routes/tags";
import { createVocabulariesSchema } from "@/routes/vocabularies";

import { baseResponseSchema } from "../schemas";

export const moduleSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  description: z.string().nullable(),
});

export const createModuleSchema = moduleSchema.pick({
  userId: true,
  name: true,
  description: true,
});

export const createModuleInputSchema = createModuleSchema.and(
  z.object({
    vocabularies: createVocabulariesSchema,
    tags: createTagsSchema.shape.tags,
  }),
);

export const createModuleResponseSchema = baseResponseSchema.and(
  z.object({
    moduleId: z.number(),
  }),
);

export type ModuleSchemaInfer = z.infer<typeof moduleSchema>;
export type CreateModuleSchemaInfer = z.infer<typeof createModuleSchema>;
export type CreateModuleInputSchemaInfer = z.infer<
  typeof createModuleInputSchema
>;
export type CreateModuleResponseSchemaInfer = z.infer<
  typeof createModuleResponseSchema
>;
