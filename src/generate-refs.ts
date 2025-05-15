import type { RouteConfigEntry } from "@react-router/dev/routes";
import { generateRef } from "./generate-ref.js";
import type { RouteReference } from "./types.js";

export const generateRefs = (routes: RouteConfigEntry[]): RouteReference[] => {
  return routes.reduce<RouteReference[]>((acc, route) => {
    if (route.path) {
      acc.push(generateRef(route));
    }
    if (route.children) {
      acc.push(...generateRefs(route.children));
    }
    return acc;
  }, []);
};
