import { z } from "zod";

import { userSchema } from "./user.schema";

export const jwtSchema = z
  .object({
    exp: z.number(),
  })
  .and(userSchema);

export type JwtSchemaInfer = z.infer<typeof jwtSchema>;
