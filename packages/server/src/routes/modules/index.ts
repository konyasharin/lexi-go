import { ModulesController } from "./modules.controller";
import { createModuleInputSchema } from "./modules.schemas";

import { publicProcedure, router } from "@/trpc";

export const modulesRouter = router({
  createModule: publicProcedure
    .input(createModuleInputSchema)
    .mutation(async ({ input }) => await new ModulesController().create(input)),
});
