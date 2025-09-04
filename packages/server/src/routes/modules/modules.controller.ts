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
      await this._tagsService.createOnlyNew(
        {
          userId: user.id,
          tags: req.data.tags,
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

    const isModuleExists = !!(await this._modulesService.getModuleById(
      req.data.id,
    ));
    if (!isModuleExists) return notFound();

    const isMyModule = await this._modulesService.isMyModule({
      moduleId: req.data.id,
      userId: user.id,
    });
    if (!isMyModule) return forbidden();

    await this._modulesService.delete(req.data);
    return ok();
  }
}
