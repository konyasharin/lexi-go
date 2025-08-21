import { NextRequest, NextResponse } from "next/server";

import { APP_PATHS } from "@/shared/constants";

export const config = {
  matcher: [
    /*
     * Исключает:
     * - API routes (api/*)
     * - статические файлы (_next/static/*)
     * - favicon.ico
     * - все файлы с точкой в имени (например, .jpg, .png)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};

export function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request;
  const { origin, pathname } = nextUrl;

  const accessToken = cookies.get(process.env.NEXT_PUBLIC_JWT_ACCESS_KEY!);
  const refreshToken = cookies.get(process.env.NEXT_PUBLIC_JWT_REFRESH_KEY!);

  if (!accessToken && !refreshToken && !pathname.startsWith("/auth"))
    return NextResponse.redirect(new URL(`${origin}${APP_PATHS.SIGN_IN}`));
  return NextResponse.next();
}
