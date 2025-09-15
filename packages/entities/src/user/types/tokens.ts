import { z } from "zod";

export const tokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type TokensSchemaInfer = z.infer<typeof tokensSchema>;
