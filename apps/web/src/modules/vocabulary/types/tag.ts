import { TagSchemaInfer } from "@repo/server/types";

export type Tag = Omit<TagSchemaInfer, "userId">;
