import { createUserDataSchema } from "@repo/entities/user";
import { z } from "zod";

import { createRequest } from "@/utils";

import { AuthController } from "./auth.controller";

import { publicProcedure, router } from "@/trpc";

export const authRouter = router({
  registerUser: publicProcedure
    .input(createUserDataSchema)
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
