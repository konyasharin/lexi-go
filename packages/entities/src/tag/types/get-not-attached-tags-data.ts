import { z } from "zod";

export const getNotAttachedTagsDataSchema = z.object({
  userId: z.number(),
  excludeModulesId: z.optional(z.number().array()),
});

export type GetNotAttachedTagsDataInfer = z.infer<
  typeof getNotAttachedTagsDataSchema
>;
