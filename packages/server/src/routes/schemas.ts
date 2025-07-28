import { z } from 'zod';

export const idSchema = z.object({
  id: z.number(),
});

export const baseResponseSchema = z.object({
  success: z.boolean(),
});

export type IdSchemaInfer = z.infer<typeof idSchema>;
export type BaseResponseSchemaInfer = z.infer<typeof baseResponseSchema>;
