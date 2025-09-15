import { TagSchemaInfer } from "@repo/entities/tag";

export type Tag = Omit<TagSchemaInfer, "userId">;
