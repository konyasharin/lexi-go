import { createRequest } from "@/utils";

import { ModulesController } from "./modules.controller";
import { createModuleInputSchema, deleteModuleSchema } from "./modules.schemas";

import { publicProcedure, router } from "@/trpc";

export const modulesRouter = router({
  create: publicProcedure
    .input(createModuleInputSchema)
    .mutation(
      async (opts) => await new ModulesController().create(createRequest(opts)),
    ),
  delete: publicProcedure
    .input(deleteModuleSchema)
    .mutation(
      async (opts) => await new ModulesController().delete(createRequest(opts)),
    ),
});
