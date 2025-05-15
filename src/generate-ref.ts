import type { RouteConfigEntry } from "@react-router/dev/routes";
import type { RouteReference } from "./types.js";

export const generateRef = (route: RouteConfigEntry): RouteReference => {
  const file = route.file.replace(/^\.\//, "").replace(/\.ts$|\.tsx$/, "");

  return {
    id: route.id || file,
    path: route.path,
  };
};
