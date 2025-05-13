import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { DEFAULT_FILE_NAME, DEFAULT_FILE_TYPE, EXPORTS } from "./constants.js";
import { getRouteId } from "./get-route-id.js";
import type { Options, RouteReference, RouteReferences } from "./types.js";

export const write = (routes: RouteReference[], options: Options): void => {
  const name = options.fileName || DEFAULT_FILE_NAME;
  const fileName = name.substring(0, name.lastIndexOf(".")) || name;
  const routesFilePath = join(
    cwd(),
    "app",
    `${fileName}.${options.fileType || DEFAULT_FILE_TYPE}`
  );
  const routesRefContent: RouteReferences = Object.fromEntries(
    routes.map((route) => [getRouteId(route, options), route])
  );
  const content = EXPORTS.map((line) =>
    line.replace("$$", JSON.stringify(routesRefContent, null, 2))
  ).join("\n\n");

  writeFileSync(routesFilePath, content, { encoding: "utf-8" });
};
