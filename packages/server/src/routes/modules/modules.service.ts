import { BaseService } from "@/utils";

import { modulesTable, TransactionType } from "@/db";

import { CreateModuleSchemaInfer } from "./modules.schemas";

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
}
