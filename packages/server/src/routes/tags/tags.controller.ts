import { Request } from "@/types";

import { auth, BaseController, controllerMethod, getUserPublic } from "@/utils";

import { TagsService } from "./tags.service";

export class TagsController extends BaseController {
  private _tagsService = new TagsService();

  @controllerMethod
  @auth
  public async getUserTags(req: Request) {
    const user = getUserPublic(req.headers);
    return this._tagsService.getUserTags({ userId: user.id });
  }
}
