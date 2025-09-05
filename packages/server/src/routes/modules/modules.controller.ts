import { Request } from "@/types";

import {
  auth,
  BaseController,
  controllerMethod,
  forbidden,
  getUserPublic,
  internalServerError,
  notFound,
  ok,
} from "@/utils";

import { TagsService } from "../tags";
import { VocabulariesService } from "../vocabularies";

import {
  CreateModuleInputSchemaInfer,
  CreateModuleResponseSchemaInfer,
  DeleteModuleSchemaInfer,
} from "./modules.schemas";
import { ModulesService } from "./modules.service";

export class ModulesController extends BaseController {
  private _modulesService = new ModulesService();
  private _vocabulariesService = new VocabulariesService();
  private _tagsService = new TagsService();

  @controllerMethod
  @auth
  public async create(
    req: Request<CreateModuleInputSchemaInfer>,
  ): Promise<CreateModuleResponseSchemaInfer> {
    const user = getUserPublic(req.headers);

    const result = await this.db.transaction(async (tx) => {
      const newModuleId = await this._modulesService.create(
        { ...req.data, userId: user.id },
        tx,
      );

      if (!newModuleId) return internalServerError();

      await this._vocabulariesService.createWithAttach(
        {
          moduleId: newModuleId,
          vocabularies: req.data.vocabularies,
        },
        tx,
      );
      await this._tagsService.createWithAttach(
        {
          userId: user.id,
          tags: req.data.tags,
          moduleId: newModuleId,
        },
        tx,
      );

      return newModuleId;
    });

    return ok({ moduleId: result });
  }

  @controllerMethod
  @auth
  public async delete(req: Request<DeleteModuleSchemaInfer>) {
    const user = getUserPublic(req.headers);
    const module = await this._modulesService.getById({
      id: req.data.id,
    });
    if (!module) return notFound();

    const fullModule = await this._modulesService.connectAdditionalInfo(module);

    const isMyModule = user.id === fullModule.userId;
    if (!isMyModule) return forbidden();

    return await this.db.transaction(async (tx) => {
      await this._modulesService.delete(req.data, tx);
      await this._vocabulariesService.delete(
        {
          vocabulariesId: fullModule.vocabularies.map((v) => v.id),
        },
        tx,
      );

      const tagsToDelete = await this._tagsService.getNotAttachedUserTags({
        userId: user.id,
        excludeModulesId: [fullModule.id],
      });
      if (tagsToDelete.length)
        await this._tagsService.delete({ tagsId: tagsToDelete }, tx);

      return ok();
    });
  }
}
