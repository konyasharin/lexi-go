import { appRouter } from "@repo/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: ({ resHeaders }) => ({ resHeaders }),
  });
}
export { handler as GET, handler as POST };
