import { AuthController } from './auth.controller';
import { createUserSchema } from './auth.schemas';

import { publicProcedure, router } from '@/trpc';

export const authRouter = router({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(
      async ({ input }) => await new AuthController().registerUser(input),
    ),
});
