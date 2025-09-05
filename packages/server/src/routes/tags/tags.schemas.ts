import { z } from "zod";

export const tagSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  color: z.string(),
});

export const createTagsSchema = z.object({
  userId: z.number(),
  tags: tagSchema
    .pick({ name: true, color: true })
    .and(z.object({ id: z.optional(z.number()) }))
    .array(),
});

export const attachTagsToModuleSchema = z.object({
  moduleId: z.number(),
  tagsId: z.number().array(),
});

export const createTagsWithAttachSchema = createTagsSchema.and(
  z.object({
    moduleId: z.number(),
  }),
);

export const getUserTagsSchema = z.object({
  userId: z.number(),
});

export const getModuleTagsSchema = z.object({
  moduleId: z.number(),
});

export const getNotAttachedUserTags = z.object({
  userId: z.number(),
  excludeModulesId: z.optional(z.number().array()),
});

export const deleteTagsSchema = z.object({
  tagsId: z.number().array(),
});

export type TagSchemaInfer = z.infer<typeof tagSchema>;
export type CreateTagsSchema = z.infer<typeof createTagsSchema>;
export type AttachTagsToModuleSchemaInfer = z.infer<
  typeof attachTagsToModuleSchema
>;
export type CreateTagsWithAttachSchemaInfer = z.infer<
  typeof createTagsWithAttachSchema
>;
export type GetUserTagsSchemaInfer = z.infer<typeof getUserTagsSchema>;
export type GetModuleTagsSchemaInfer = z.infer<typeof getModuleTagsSchema>;
export type GetNotAttachedUserTagsInfer = z.infer<
  typeof getNotAttachedUserTags
>;
export type DeleteTagsSchemaInfer = z.infer<typeof deleteTagsSchema>;
