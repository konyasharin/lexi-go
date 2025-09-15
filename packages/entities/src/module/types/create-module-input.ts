import { z } from "zod";

import { createVocabulariesDataSchema } from "@/vocabulary";

import { createModuleDataSchema } from "./create-module-data";

import { idSchema } from "@/shared";
import { createTagsDataSchema } from "@/tag";

export const createModuleInputSchema = createModuleDataSchema
  .omit({ userId: true })
  .and(
    z.object({
      vocabularies: createVocabulariesDataSchema,
      newTags: createTagsDataSchema.shape.tags,
      userTags: idSchema.array(),
    }),
  );

export type CreateModuleInputSchemaInfer = z.infer<
  typeof createModuleInputSchema
>;
