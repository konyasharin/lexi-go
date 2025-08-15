import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
});

export type UserSchemaInfer = z.infer<typeof userSchema>;
