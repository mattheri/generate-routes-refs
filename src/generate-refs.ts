import type { RouteConfigEntry } from "@react-router/dev/routes";
import { generateRef } from "./generate-ref.js";
import type { RouteReference } from "./types.js";

export const generateRefs = async (
  routes: RouteConfigEntry[]
): Promise<RouteReference[]> => {
  return routes.reduce<Promise<RouteReference[]>>(async (acc, route) => {
    const accumulator = await acc;

    if (route.path) {
      accumulator.push(await generateRef(route));
    }
    if (route.children) {
      accumulator.push(...(await generateRefs(route.children)));
    }
    return acc;
  }, Promise.resolve([]));
};
