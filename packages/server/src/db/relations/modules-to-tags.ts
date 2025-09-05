import { relations } from "drizzle-orm";

import { modulesTable, modulesToTagsTable, tagsTable } from "../tables";

export const modulesToTagsRelations = relations(
  modulesToTagsTable,
  ({ one }) => ({
    module: one(modulesTable, {
      fields: [modulesToTagsTable.moduleId],
      references: [modulesTable.id],
    }),
    tag: one(tagsTable, {
      fields: [modulesToTagsTable.tagId],
      references: [tagsTable.id],
    }),
  }),
);
