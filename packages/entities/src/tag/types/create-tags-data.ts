import { z } from "zod";

import { tagSchema } from "./tag";

export const createTagsDataSchema = z.object({
  userId: z.number(),
  tags: tagSchema.pick({ name: true, color: true }).array(),
});

export type CreateTagsDataSchemaInfer = z.infer<typeof createTagsDataSchema>;
