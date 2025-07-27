import { appRouter } from '@repo/server';
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from '@trpc/server/adapters/fetch';

console.log('appRouter:', Object.keys(appRouter._def));
function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createContext: (_: FetchCreateContextFnOptions) => {
      return {
        session: null,
      };
    },
  });
}
export { handler as GET, handler as POST };
