import { TagSchemaInfer } from "./tags.schemas";

export class TagsTransformer {
  public static toModuleFormat(tag: TagSchemaInfer) {
    return {
      id: tag.id,
      name: tag.name,
      color: tag.color,
    };
  }
}
