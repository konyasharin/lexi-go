import { createModuleInputSchema } from "@repo/entities/module";
import { idSchema } from "@repo/entities/shared";

import { createRequest } from "@/utils";

import { ModulesController } from "./modules.controller";

import { publicProcedure, router } from "@/trpc";

export const modulesRouter = router({
  create: publicProcedure
    .input(createModuleInputSchema)
    .mutation(
      async (opts) => await new ModulesController().create(createRequest(opts)),
    ),
  delete: publicProcedure
    .input(idSchema)
    .mutation(
      async (opts) => await new ModulesController().delete(createRequest(opts)),
    ),
});
