export type RouteAccess = "private" | "onlyPublic" | "public";
export interface Route {
  path: string;
  access: RouteAccess;
}
