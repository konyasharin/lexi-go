import { z } from "zod";

import { moduleSchema } from "./module";

export const getModuleFullDataSchema = moduleSchema;

export type GetModuleFullDataSchemaInfer = z.infer<
  typeof getModuleFullDataSchema
>;
