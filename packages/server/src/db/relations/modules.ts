import { relations } from "drizzle-orm";

import {
  modulesTable,
  modulesToTags,
  modulesToVocabularies,
  usersTable,
} from "../tables";

export const modulesRelations = relations(modulesTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [modulesTable.userId],
    references: [usersTable.id],
  }),
  modulesToVocabularies: many(modulesToVocabularies),
  modulesToTags: many(modulesToTags),
}));
