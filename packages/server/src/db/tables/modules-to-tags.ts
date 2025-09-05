import { integer, pgTable } from "drizzle-orm/pg-core";

import { modulesTable } from "./modules";
import { tagsTable } from "./tags";

export const modulesToTagsTable = pgTable("modules_to_tags", {
  moduleId: integer("module_id")
    .notNull()
    .references(() => modulesTable.id, { onDelete: "cascade" }),
  tagId: integer("tag_id")
    .notNull()
    .references(() => tagsTable.id, { onDelete: "cascade" }),
});
