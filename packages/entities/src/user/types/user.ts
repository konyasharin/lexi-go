import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  password: z.string(),
});

export type UserSchemaInfer = z.infer<typeof userSchema>;
