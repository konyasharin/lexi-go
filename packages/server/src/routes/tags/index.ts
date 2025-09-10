import { createRequest } from "@/utils";

import { TagsController } from "./tags.controller";

import { publicProcedure, router } from "@/trpc";

export * from "./tags.schemas";
export * from "./tags.service";

export const tagsRouter = router({
  getUserTags: publicProcedure.query(
    async (opts) => await new TagsController().getUserTags(createRequest(opts)),
  ),
});
