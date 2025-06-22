import type { RouteConfigEntry } from "@react-router/dev/routes";
import { getRouteParams } from "./get-route-params.js";
import type { Options, RouteReference } from "./types.js";

export const generateRef = async (
  route: RouteConfigEntry,
  routeMetadataFn?: Options["routeMetadata"]
): Promise<RouteReference> => {
  const file = route.file.replace(/^\.\//, "").replace(/\.ts$|\.tsx$/, "");

  return {
    id: route.id || file,
    metadata: routeMetadataFn ? await routeMetadataFn(route.file) : undefined,
    path: route.path,
    params: getRouteParams(route),
  };
};
