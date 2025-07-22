import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';

import { authRouter } from '@/routes';

import { router } from './trpc';

const appRouter = router({
  auth: authRouter,
});

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(3000);

export type AppRouter = typeof appRouter;
