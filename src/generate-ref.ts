import type { RouteConfigEntry } from "@react-router/dev/routes";
import type { RouteReference } from "./types.js";
import { viteImport } from "./vite-import.js";

export const generateRef = async (
  route: RouteConfigEntry
): Promise<RouteReference> => {
  let handle: unknown = undefined;
  const file = route.file.replace(/^\.\//, "");

  try {
    const module = await viteImport(file);
    handle = module.handle;
  } catch {}

  return {
    handle,
    id: file.replace(/\.ts$|\.tsx$/, ""),
    path: route.path,
  };
};
