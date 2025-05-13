export const EXPORTS = [
  "export const routes = $$ as const;",
  "export type Routes = typeof routes;",
  "export type Route = keyof Routes & (string | {});",
  "export type RouteRef<T extends Route> = Routes[T] extends object ? Routes[T] : never;",
];

export const DEFAULT_FILE_NAME = "route-refs";

export const DEFAULT_FILE_TYPE = "ts";
