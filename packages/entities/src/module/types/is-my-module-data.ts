import { z } from "zod";

export const isMyModuleDataSchema = z.object({
  moduleId: z.number(),
  userId: z.number(),
});

export type IsMyModuleDataSchemaInfer = z.infer<typeof isMyModuleDataSchema>;
