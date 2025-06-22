export const EXPORTS = [
  "export const routes = $$ as const;",
  "type Prettify<T> = {[K in keyof T]: T[K];} & {};",
  "type RouteParam = { name: string; optional: boolean };",
  "type ParamsObject<T extends readonly RouteParam[]> = Prettify<{ [P in Extract<T[number], { optional: false }>['name']]: string; } & { [P in Extract<T[number], { optional: true }>['name']]?: string; }>;",
  `export type RoutesWithParams<T extends Record<
    string,
    {
      id: string;
      path?: string;
      params?: readonly RouteParam[];
      metadata?: JsonSerializable;
    }
  >
> = Prettify<{
  [K in keyof T]: Omit<T[K], "params"> & {
    params: ParamsObject<
      T[K]["params"] extends readonly RouteParam[] ? T[K]["params"] : []
    >;
  };
}>;`,
  "export type Routes = RoutesWithParams<typeof routes>",
  "export type Route = keyof Routes & (string | {});",
  "export type RouteRef<T extends Route> = Routes[T] extends object ? Routes[T] : never;",
];

export const DEFAULT_FILE_NAME = "route-refs";

export const DEFAULT_FILE_TYPE = "ts";
