import { relations } from "drizzle-orm";

import { modulesToTagsTable, tagsTable, usersTable } from "../tables";

export const tagsRelations = relations(tagsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [tagsTable.userId],
    references: [usersTable.id],
  }),
  modulesToTags: many(modulesToTagsTable),
}));
