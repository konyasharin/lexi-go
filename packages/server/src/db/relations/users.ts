import { relations } from "drizzle-orm";

import { modulesTable, tagsTable, usersTable } from "../tables";

export const usersRelations = relations(usersTable, ({ many }) => ({
  tags: many(tagsTable),
  modules: many(modulesTable),
}));
