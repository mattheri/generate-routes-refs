export interface RouteReference {
  id: string;
  path?: string;
}

export interface RouteReferences {
  [key: string]: RouteReference;
}

export interface Options {
  fileName?: string;
  fileType?: "ts" | "js";
  removeFromRouteKey?: string | RegExp;
}
