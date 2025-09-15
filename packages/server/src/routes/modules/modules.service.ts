import {
  CreateModuleDataSchemaInfer,
  GetModuleFullDataSchemaInfer,
  GetUserOwnedModulesDataSchemaInfer,
  IsMyModuleDataSchemaInfer,
} from "@repo/entities/module";
import { IdSchemaInfer } from "@repo/entities/shared";
import { tagToModuleFormat } from "@repo/entities/tag";
import { eq } from "drizzle-orm";

import { BaseService } from "@/utils";

import { modulesTable, TransactionType } from "@/db";

import { TagsService } from "../tags";
import { VocabulariesService } from "../vocabularies";

export class ModulesService extends BaseService {
  private _vocabulariesService = new VocabulariesService();
  private _tagsService = new TagsService();

  public async create(data: CreateModuleDataSchemaInfer, tx?: TransactionType) {
    const newModuleId = await this.client
      .get(tx)
      .insert(modulesTable)
      .values({
        userId: data.userId,
        name: data.name,
        description: data.description,
      })
      .returning({ id: modulesTable.id });

    return newModuleId[0]?.id;
  }

  public async delete(data: IdSchemaInfer, tx?: TransactionType) {
    await this.client
      .get(tx)
      .delete(modulesTable)
      .where(eq(modulesTable.id, data.id));
  }

  public async getUserOwned(data: GetUserOwnedModulesDataSchemaInfer) {
    const userModules = await this.client.db.query.modulesTable.findMany({
      where: (module, { eq }) => eq(module.id, data.userId),
    });
    if (!data.tagsId) return userModules;

    const userModulesWithTags =
      await this.client.db.query.modulesToTagsTable.findMany({
        where: (pair, { and, inArray }) =>
          and(
            inArray(
              pair.moduleId,
              userModules.map((module) => module.id),
            ),
            inArray(pair.tagId, data.tagsId!),
          ),
      });

    return userModules.filter((um) =>
      userModulesWithTags.some((umwt) => umwt.moduleId === um.id),
    );
  }

  public async getById(data: IdSchemaInfer) {
    return this.client.db.query.modulesTable.findFirst({
      where: (module, { eq }) => eq(module.id, data.id),
    });
  }

  public async connectAdditionalInfo(data: GetModuleFullDataSchemaInfer) {
    const tags = await this._tagsService.getModuleTags({ id: data.id });
    const vocabularies = await this._vocabulariesService.getModuleVocabularies({
      id: data.id,
    });

    return {
      ...data,
      tags: tags.map((tag) => tagToModuleFormat(tag)),
      vocabularies,
    };
  }

  public async isMy(data: IsMyModuleDataSchemaInfer) {
    const module = await this.getById({ id: data.moduleId });
    if (!module) return false;

    return data.userId === module.userId;
  }
}
