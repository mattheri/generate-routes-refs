export interface RouteReference {
  id: string;
  metadata?: JsonSerializable;
  path?: string;
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
