import { z } from "zod";

export const tagSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  color: z.string(),
});

export const createTagsSchema = z.object({
  userId: z.number(),
  tags: tagSchema.pick({ name: true, color: true }).array(),
});

export const createOnlyNewTagsSchema = createTagsSchema;

export type TagSchemaInfer = z.infer<typeof tagSchema>;
export type CreateTagsSchema = z.infer<typeof createTagsSchema>;
export type CreateOnlyNewTagsSchemaInfer = z.infer<
  typeof createOnlyNewTagsSchema
>;
