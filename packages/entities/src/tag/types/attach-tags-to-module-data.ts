import { z } from "zod";

export const attachTagsToModuleDataSchema = z.object({
  moduleId: z.number(),
  tagsId: z.number().array(),
});

export type AttachTagsToModuleDataSchemaInfer = z.infer<
  typeof attachTagsToModuleDataSchema
>;
