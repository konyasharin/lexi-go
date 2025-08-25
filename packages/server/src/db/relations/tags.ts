import { relations } from "drizzle-orm";

import { modulesToTags, tagsTable, usersTable } from "../tables";

export const tagsRelations = relations(tagsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [tagsTable.userId],
    references: [usersTable.id],
  }),
  modulesToTags: many(modulesToTags),
}));
