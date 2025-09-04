import { eq } from "drizzle-orm";

import { BaseService } from "@/utils";

import { modulesTable, TransactionType } from "@/db";

import {
  CreateModuleSchemaInfer,
  DeleteModuleSchemaInfer,
  IsMyModuleSchemaInfer,
  ModuleSchemaInfer,
} from "./modules.schemas";

export class ModulesService extends BaseService {
  public async create(data: CreateModuleSchemaInfer, tx?: TransactionType) {
    const newModuleId = await this.getClient(tx)
      .insert(modulesTable)
      .values({
        userId: data.userId,
        name: data.name,
        description: data.description,
      })
      .returning({ id: modulesTable.id });

    return newModuleId[0]?.id;
  }

  public async delete(data: DeleteModuleSchemaInfer, tx?: TransactionType) {
    await this.getClient(tx)
      .delete(modulesTable)
      .where(eq(modulesTable.id, data.id));
  }

  public async getModuleById(id: ModuleSchemaInfer["id"]) {
    return this.db.query.modulesTable.findFirst({
      where: (module, { eq }) => eq(module.id, id),
    });
  }

  public async isMyModule(data: IsMyModuleSchemaInfer) {
    const module = await this.getModuleById(data.moduleId);
    if (!module) return false;

    return data.userId === module.userId;
  }
}
