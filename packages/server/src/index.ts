import { authRouter, modulesRouter } from "@/routes";

import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  modules: modulesRouter,
});

export type AppRouter = typeof appRouter;
