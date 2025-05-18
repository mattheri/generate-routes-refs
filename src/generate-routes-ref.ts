import type { RouteConfig } from "@react-router/dev/routes";
import { generateRefs } from "./generate-refs.js";
import type { Options, RouteReference } from "./types.js";
import { write } from "./write.js";

export const generateRoutesRef = async (
  routesConfig: RouteConfig,
  options: Options = {}
): Promise<RouteConfig> => {
  const config = await routesConfig;
  const routes: RouteReference[] = await generateRefs(config);

  write(routes, options);

  return routesConfig;
};
