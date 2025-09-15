import { z } from "zod";

export const getUserOwnedModulesDataSchema = z.object({
  userId: z.number(),
  tagsId: z.optional(z.number().array()),
});

export type GetUserOwnedModulesDataSchemaInfer = z.infer<
  typeof getUserOwnedModulesDataSchema
>;
