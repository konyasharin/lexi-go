import { userPublicSchema } from "@repo/entities/user";
import { z } from "zod";

export const jwtSchema = z
  .object({
    exp: z.number(),
  })
  .and(userPublicSchema);

export type JwtSchemaInfer = z.infer<typeof jwtSchema>;
