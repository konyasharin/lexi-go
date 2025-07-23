import { z } from 'zod';

export const idSchema = z.object({
  id: z.number(),
});

export type IdSchemaInfer = z.infer<typeof idSchema>;
