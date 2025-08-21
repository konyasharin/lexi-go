import { Route, RouteAccess } from "../types";

import { APP_PATHS } from "./app-paths";

export const ROUTES: Route[] = [
  {
    path: APP_PATHS.MAIN,
    access: "private",
  },
  {
    path: APP_PATHS.SIGN_IN,
    access: "onlyPublic",
  },
  {
    path: APP_PATHS.SIGN_UP,
    access: "onlyPublic",
  },
  {
    path: APP_PATHS.GOOGLE_OAUTH,
    access: "onlyPublic",
  },
];

const getRoutesByAccess = (access: RouteAccess) => {
  return ROUTES.filter((route) => route.access === access);
};

export const PUBLIC_ROUTES = getRoutesByAccess("public");
export const ONLY_PUBLIC_ROUTES = getRoutesByAccess("onlyPublic");
export const PRIVATE_ROUTES = getRoutesByAccess("private");
