import { appRouter } from '@repo/server';
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from '@trpc/server/adapters/fetch';
function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createContext: (_: FetchCreateContextFnOptions) => {
      return {};
    },
  });
}
export { handler as GET, handler as POST };
