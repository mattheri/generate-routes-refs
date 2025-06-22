export const EXPORTS = [
  "export const routes = $$ as const;",
  "type Prettify<T> = {[K in keyof T]: T[K];} & {};",
  "type ParamsObject<T extends readonly RouteParam[]> = Prettify<{ [P in Extract<T[number], { optional: false }>['name']]: string; } & { [P in Extract<T[number], { optional: true }>['name']]?: string; }>;",
  "export type Routes = typeof routes & { params?: ParamsObject<typeof routes[number]['params']> }",
  "export type Route = keyof Routes & (string | {});",
  "export type RouteRef<T extends Route> = Routes[T] extends object ? Routes[T] : never;",
];

export const DEFAULT_FILE_NAME = "route-refs";

export const DEFAULT_FILE_TYPE = "ts";
