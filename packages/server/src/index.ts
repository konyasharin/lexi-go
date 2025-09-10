import { authRouter, modulesRouter, tagsRouter } from "@/routes";

import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  modules: modulesRouter,
  tags: tagsRouter,
});

export type AppRouter = typeof appRouter;
