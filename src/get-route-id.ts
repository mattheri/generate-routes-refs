import type { Options, RouteReference } from "./types.js";

export const getRouteId = (route: RouteReference, options: Options): string => {
  if (options.removeFromRouteKey) {
    return route.path?.replace(options.removeFromRouteKey, "") || "";
  }

  return route.path || "";
};
