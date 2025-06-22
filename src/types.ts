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
