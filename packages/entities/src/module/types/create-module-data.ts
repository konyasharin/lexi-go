import { z } from "zod";

import { moduleSchema } from "./module";

export const createModuleDataSchema = moduleSchema.pick({
  userId: true,
  name: true,
  description: true,
});

export type CreateModuleDataSchemaInfer = z.infer<
  typeof createModuleDataSchema
>;
