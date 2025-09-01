import { relations } from "drizzle-orm";

import {
  modulesTable,
  modulesToTags,
  modulesToVocabulariesTable,
  usersTable,
} from "../tables";

export const modulesRelations = relations(modulesTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [modulesTable.userId],
    references: [usersTable.id],
  }),
  modulesToVocabularies: many(modulesToVocabulariesTable),
  modulesToTags: many(modulesToTags),
}));
