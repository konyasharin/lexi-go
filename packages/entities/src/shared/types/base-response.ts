import { z } from "zod";

export const baseResponseSchema = z.object({
  success: z.boolean(),
});

export type BaseResponseSchemaInfer = z.infer<typeof baseResponseSchema>;
