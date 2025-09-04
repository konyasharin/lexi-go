import { appRouter } from "@repo/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { API_HEADER_KEYS } from "@/shared/constants";
import { parseCookies } from "@/shared/utils";

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: ({ resHeaders, req }) => {
      const reqAuthorization = req.headers.get(API_HEADER_KEYS.AUTHORIZATION);

      if (reqAuthorization) {
        resHeaders.set(API_HEADER_KEYS.AUTHORIZATION, reqAuthorization);
      } else {
        const cookieHeader = req.headers.get("cookie");
        const cookies = parseCookies(cookieHeader);
        const token = cookies[process.env.NEXT_PUBLIC_JWT_ACCESS_KEY!];
        if (token)
          resHeaders.set(API_HEADER_KEYS.AUTHORIZATION, `Bearer ${token}`);
      }

      return {
        resHeaders,
      };
    },
  });
}
export { handler as GET, handler as POST };
