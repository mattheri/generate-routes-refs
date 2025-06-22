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

/**
 * Transforms the `params` property of each route in a `RouteReferences` object
 * from an array of `RouteParam` to an object using `ParamsObject`.
 * @example
 * const routes = {
 *   "households": {
 *     "id": "households", "path": "/households/:id",
 *     "params": [{ "name": "id", "optional": false }]
 *   },
 *   "products": {
 *     "id": "products", "path": "/products/:productId/color/:color?",
 *     "params": [
 *       { "name": "productId", "optional": false },
 *       { "name": "color", "optional": true }
 *     ]
 *   }
 * } as const;
 * type TransformedRoutes = RoutesWithParams<typeof routes>;
 * // TransformedRoutes is:
 * // {
 * //   households: { id: "households"; path: "..."; params: { id: string; }; };
 * //   products: { id: "products"; path: "..."; params: { productId: string; color?: string; }; };
 * // }
 */
export type RoutesWithParams<
  T extends Record<
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
}>;
