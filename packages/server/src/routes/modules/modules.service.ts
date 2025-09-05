import { eq } from "drizzle-orm";

import { BaseService } from "@/utils";

import { modulesTable, TransactionType } from "@/db";
import { TagsTransformer } from "@/routes/tags/tags.transformer";

import { TagsService } from "../tags";
import { VocabulariesService } from "../vocabularies";

import {
  ConnectAdditionalInfoSchemaInfer,
  CreateModuleSchemaInfer,
  DeleteModuleSchemaInfer,
  GetModuleByIdSchemaInfer,
  GetUserOwnedSchemaInfer,
  IsMyModuleSchemaInfer,
  ModuleSchemaInfer,
} from "./modules.schemas";

export class ModulesService extends BaseService {
  private _vocabulariesService = new VocabulariesService();
  private _tagsService = new TagsService();

  public async create(data: CreateModuleSchemaInfer, tx?: TransactionType) {
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

  public async delete(data: DeleteModuleSchemaInfer, tx?: TransactionType) {
    await this.client
      .get(tx)
      .delete(modulesTable)
      .where(eq(modulesTable.id, data.id));
  }

  public async getUserOwned(data: GetUserOwnedSchemaInfer) {
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

  public async getById(data: GetModuleByIdSchemaInfer) {
    return this.client.db.query.modulesTable.findFirst({
      where: (module, { eq }) => eq(module.id, data.id),
    });
  }

  public async connectAdditionalInfo(data: ConnectAdditionalInfoSchemaInfer) {
    const tags = await this._tagsService.getModuleTags({ moduleId: data.id });
    const vocabularies = await this._vocabulariesService.getModuleVocabularies({
      moduleId: data.id,
    });

    return {
      ...data,
      tags: tags.map((tag) => TagsTransformer.toModuleFormat(tag)),
      vocabularies,
    };
  }

  public async isMy(data: IsMyModuleSchemaInfer) {
    const module = await this.getById({ id: data.moduleId });
    if (!module) return false;

    return data.userId === module.userId;
  }
}
