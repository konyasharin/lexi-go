import { relations } from "drizzle-orm";

import { modulesTable, modulesToTags, tagsTable } from "../tables";

export const modulesToTagsRelations = relations(modulesToTags, ({ one }) => ({
  module: one(modulesTable, {
    fields: [modulesToTags.moduleId],
    references: [modulesTable.id],
  }),
  tag: one(tagsTable, {
    fields: [modulesToTags.tagId],
    references: [tagsTable.id],
  }),
}));
