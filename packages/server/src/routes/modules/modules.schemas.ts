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

export const createModuleInputSchema = createModuleSchema
  .omit({ userId: true })
  .and(
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

export const deleteModuleSchema = moduleSchema.pick({
  id: true,
});

export const getModuleByIdSchema = moduleSchema.pick({
  id: true,
});

export const isMyModuleSchema = z.object({
  moduleId: z.number(),
  userId: z.number(),
});

export const getUserOwnedSchema = z.object({
  userId: z.number(),
  tagsId: z.optional(z.number().array()),
});

export const connectAdditionalInfoSchema = moduleSchema;

export type ModuleSchemaInfer = z.infer<typeof moduleSchema>;
export type CreateModuleSchemaInfer = z.infer<typeof createModuleSchema>;
export type CreateModuleInputSchemaInfer = z.infer<
  typeof createModuleInputSchema
>;
export type CreateModuleResponseSchemaInfer = z.infer<
  typeof createModuleResponseSchema
>;
export type DeleteModuleSchemaInfer = z.infer<typeof deleteModuleSchema>;
export type GetModuleByIdSchemaInfer = z.infer<typeof getModuleByIdSchema>;
export type IsMyModuleSchemaInfer = z.infer<typeof isMyModuleSchema>;
export type GetUserOwnedSchemaInfer = z.infer<typeof getUserOwnedSchema>;
export type ConnectAdditionalInfoSchemaInfer = z.infer<
  typeof connectAdditionalInfoSchema
>;
