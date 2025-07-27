import { appRouter } from '@repo/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

console.log('appRouter:', Object.keys(appRouter._def));
function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // createContext: (_: FetchCreateContextFnOptions) => {
    //   return {
    //     session: null,
    //   };
    // },
  });
}
export { handler as GET, handler as POST };
