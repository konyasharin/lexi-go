import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  password: z.string(),
});

export const createUserSchema = userSchema.pick({
  email: true,
  password: true,
});

export type UserSchemaInfer = z.infer<typeof userSchema>;
export type CreateUserSchemaInfer = z.infer<typeof createUserSchema>;
