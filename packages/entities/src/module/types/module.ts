import { z } from "zod";

export const moduleSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  description: z.string().nullable(),
});

export type ModuleSchemaInfer = z.infer<typeof moduleSchema>;
