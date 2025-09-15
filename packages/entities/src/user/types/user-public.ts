import { z } from "zod";

import { userSchema } from "./user";

export const userPublicSchema = userSchema.omit({
  password: true,
});

export type UserPublicSchemaInfer = z.infer<typeof userPublicSchema>;
