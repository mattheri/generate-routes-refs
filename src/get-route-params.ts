import type { RouteConfigEntry } from "@react-router/dev/routes";
import type { RouteParam } from "./types.js";

export const getRouteParams = (route: RouteConfigEntry): RouteParam[] => {
  const regex = /:[\w|\d]+\??/g;
  const routeParams = route.path?.match(regex) ?? null;

  return (
    routeParams?.map((param) => {
      const isOptional = param.endsWith("?");
      const name = param.replace(":", "").replace("?", "");

      return {
        name,
        optional: isOptional,
      };
    }) ?? []
  );
};
