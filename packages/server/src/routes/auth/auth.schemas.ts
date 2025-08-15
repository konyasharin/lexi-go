import { z } from "zod";

import { baseResponseSchema } from "../schemas";

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  password: z.string(),
});

export const createUserSchema = userSchema.pick({
  email: true,
  password: true,
});

export const userPublicSchema = userSchema.omit({
  password: true,
});

export const googleUserInfoSchema = z.object({
  email: z.email(),
  name: z.string(),
  picture: z.string(),
});

export const tokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const authWithGoogleResponseSchema = z.object({
  ...baseResponseSchema.shape,
  tokens: z.union([tokensSchema, z.undefined()]),
});

export type UserSchemaInfer = z.infer<typeof userSchema>;
export type CreateUserSchemaInfer = z.infer<typeof createUserSchema>;
export type UserPublicSchemaInfer = z.infer<typeof userPublicSchema>;
export type GoogleUserInfoSchemaInfer = z.infer<typeof googleUserInfoSchema>;
export type TokensSchemaInfer = z.infer<typeof tokensSchema>;
export type AuthWithGoogleResponseSchemaInfer = z.infer<
  typeof authWithGoogleResponseSchema
>;
