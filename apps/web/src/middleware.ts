import { NextRequest, NextResponse } from "next/server";

import {
  APP_PATHS,
  getMiddlewareRedirectUrl,
  isPathnameMatchAnyRoute,
  ONLY_PUBLIC_ROUTES,
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
} from "@/modules/routing";

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
  const isPathnameConfigured = isPathnameMatchAnyRoute(pathname);

  console.log(pathname);
  if (
    !accessToken &&
    !refreshToken &&
    !isPathnameMatchAnyRoute(pathname, [
      ...ONLY_PUBLIC_ROUTES,
      ...PUBLIC_ROUTES,
    ]) &&
    isPathnameConfigured
  )
    return NextResponse.redirect(
      getMiddlewareRedirectUrl(origin, APP_PATHS.SIGN_IN),
    );

  if (
    accessToken &&
    !isPathnameMatchAnyRoute(pathname, [...PRIVATE_ROUTES, ...PUBLIC_ROUTES]) &&
    isPathnameConfigured
  ) {
    return NextResponse.redirect(
      getMiddlewareRedirectUrl(origin, APP_PATHS.MAIN),
    );
  }

  return NextResponse.next();
}
