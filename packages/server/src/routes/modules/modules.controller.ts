import { BaseController, catchError, internalServerError, ok } from "@/utils";

import { TagsService } from "../tags";
import { VocabulariesService } from "../vocabularies";

import {
  CreateModuleInputSchemaInfer,
  CreateModuleResponseSchemaInfer,
  CreateModuleSchemaInfer,
} from "./modules.schemas";
import { ModulesService } from "./modules.service";

export class ModulesController extends BaseController {
  private _modulesService = new ModulesService();
  private _vocabulariesService = new VocabulariesService();
  private _tagsService = new TagsService();

  @catchError
  public async create(
    data: CreateModuleInputSchemaInfer,
  ): Promise<CreateModuleResponseSchemaInfer> {
    const result = await this.db.transaction(async (tx) => {
      const newModuleId = await this._modulesService.create(data, tx);

      if (!newModuleId) return internalServerError();

      await this._vocabulariesService.createWithAttach(
        {
          moduleId: newModuleId,
          vocabularies: data.vocabularies,
        },
        tx,
      );
      await this._tagsService.createOnlyNew(
        {
          userId: data.userId,
          tags: data.tags,
        },
        tx,
      );

      return newModuleId;
    });

    return ok({ moduleId: result });
  }
}
