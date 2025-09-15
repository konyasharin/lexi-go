import { z } from "zod";

import { baseResponseSchema } from "@/shared";

export const createModuleResponseSchema = baseResponseSchema.and(
  z.object({
    moduleId: z.number(),
  }),
);

export type CreateModuleResponseSchemaInfer = z.infer<
  typeof createModuleResponseSchema
>;
