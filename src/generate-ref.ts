import type { RouteConfigEntry } from "@react-router/dev/routes";
import type { RouteReference } from "./types.js";
import { viteImport } from "./vite-import.js";

export const generateRef = async (
  route: RouteConfigEntry
): Promise<RouteReference> => {
  let handle: unknown = undefined;

  try {
    const module = await viteImport(route.file);
    handle = module.handle;
  } catch {
    console.error(
      `Error importing module ${route.file}. Please check the file path and ensure it exists.`
    );
  }

  return {
    handle,
    id: route.file.replace(/\.ts$|\.tsx$/, ""),
    path: route.path,
  };
};
