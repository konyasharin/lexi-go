import { z } from "zod";

export const googleUserInfoSchema = z.object({
  email: z.email(),
  name: z.string(),
  picture: z.string(),
});

export type GoogleUserInfoSchemaInfer = z.infer<typeof googleUserInfoSchema>;
