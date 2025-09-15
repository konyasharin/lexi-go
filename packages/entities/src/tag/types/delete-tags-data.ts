import { z } from "zod";

export const deleteTagsDataSchema = z.object({
  tagsId: z.number().array(),
});

export type DeleteTagsDataSchemaInfer = z.infer<typeof deleteTagsDataSchema>;
