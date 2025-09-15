import { z } from "zod";

export const tagSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  color: z.string(),
});

export type TagSchemaInfer = z.infer<typeof tagSchema>;
