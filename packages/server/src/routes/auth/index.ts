import { z } from "zod";

import { createRequest } from "@/utils";

import { AuthController } from "./auth.controller";
import { createUserSchema } from "./auth.schemas";

import { publicProcedure, router } from "@/trpc";

export * from "./auth.schemas";
export const authRouter = router({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(
      async (opts) =>
        await new AuthController().registerUser(createRequest(opts)),
    ),
  authWithGoogle: publicProcedure
    .input(z.string())
    .mutation(
      async (opts) =>
        await new AuthController().authWithGoogle(createRequest(opts)),
    ),
  refresh: publicProcedure
    .input(z.string())
    .mutation(
      async (opts) => await new AuthController().refresh(createRequest(opts)),
    ),
});
