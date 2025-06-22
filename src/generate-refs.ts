import type { RouteConfigEntry } from "@react-router/dev/routes";
import { generateRef } from "./generate-ref.js";
import type { Options, RouteReference } from "./types.js";

export const generateRefs = async (
  routes: RouteConfigEntry[],
  routeMetadataFn?: Options["routeMetadata"]
): Promise<RouteReference[]> => {
  return await routes.reduce<Promise<RouteReference[]>>(async (acc, route) => {
    const accumulator = await acc;

    if (route.path) {
      accumulator.push(await generateRef(route, routeMetadataFn));
    }
    if (route.children) {
      accumulator.push(
        ...(await generateRefs(route.children, routeMetadataFn))
      );
    }
    return accumulator;
  }, Promise.resolve([]));
};
