import { z } from "zod";

import { userSchema } from "./user";

export const getUserByEmailDataSchema = userSchema.pick({
  email: true,
});

export type GetUserByEmailDataSchemaInfer = z.infer<
  typeof getUserByEmailDataSchema
>;
