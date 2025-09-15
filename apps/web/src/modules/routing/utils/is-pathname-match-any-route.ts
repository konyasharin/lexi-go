import { ROUTES } from "../constants";
import { Route } from "../types";

export const isPathnameMatchAnyRoute = (
  pathname: string,
  routes: Route[] = ROUTES,
) => {
  return routes.some((route) => pathname === route.path);
};
