export interface RouteReference {
  id: string;
  metadata?: JsonSerializable;
  path?: string;
  params?: RouteParam[];
}

export interface RouteReferences {
  [key: string]: RouteReference;
}

export interface JsonSerializable {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | JsonSerializable
    | JsonSerializable[];
}

export type RouteMetadataFn = (path?: string) => Promise<JsonSerializable>;

export interface Options {
  fileName?: string;
  fileType?: "ts" | "js";
  removeFromRouteKey?: string | RegExp;
  routeMetadata?: RouteMetadataFn;
}

export interface RouteParam {
  name: string;
  optional: boolean;
}

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Transforms an array of RouteParam objects into a single object.
 * @example
 * // returns { hello: string; user: string; blabla?: string; world?: string; }
 * type MyParams = ParamsObject<[
 *   { name: 'blabla', optional: true },
 *   { name: 'hello', optional: false },
 *   { name: 'world', optional: true },
 *   { name: 'user', optional: false }
 * ]>
 */
export type ParamsObject<T extends readonly RouteParam[]> = Prettify<
  {
    [P in Extract<T[number], { optional: false }>["name"]]: string;
  } & {
    [P in Extract<T[number], { optional: true }>["name"]]?: string;
  }
>;
