import { TagSchemaInfer } from "@/tag";

export const tagToModuleFormat = (tag: TagSchemaInfer) => {
  return {
    id: tag.id,
    name: tag.name,
    color: tag.color,
  };
};
