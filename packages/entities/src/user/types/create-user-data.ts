import { z } from "zod";

import { userSchema } from "./user";

export const createUserDataSchema = userSchema.pick({
  email: true,
  password: true,
});

export type CreateUserDataSchemaInfer = z.infer<typeof createUserDataSchema>;
