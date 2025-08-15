import { z } from "zod";

import { AuthController } from "./auth.controller";
import { createUserSchema } from "./auth.schemas";

import { publicProcedure, router } from "@/trpc";

export * from "./auth.schemas";
export const authRouter = router({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(
      async ({ input }) => await new AuthController().registerUser(input),
    ),
  authWithGoogle: publicProcedure
    .input(z.string())
    .mutation(
      async ({ input, ctx }) =>
        await new AuthController().authWithGoogle(input, ctx.resHeaders),
    ),
});
