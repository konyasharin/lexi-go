import { z } from "zod";

import { createTagsDataSchema } from "./create-tags-data";

import { idSchema } from "@/shared";

export const createTagsWithAttachDataSchema = z.object({
  userId: z.number(),
  moduleId: z.number(),
  newTags: createTagsDataSchema.shape.tags,
  userTags: idSchema.array(),
});

export type CreateTagsWithAttachDataSchemaInfer = z.infer<
  typeof createTagsWithAttachDataSchema
>;
