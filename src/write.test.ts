import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { describe, expect, it, vi } from "vitest";
import { DEFAULT_FILE_NAME, DEFAULT_FILE_TYPE, EXPORTS } from "./constants.js";
import { getRouteId } from "./get-route-id.js";
import type { Options, RouteReference } from "./types.js";
import { write } from "./write.js";

vi.mock("node:fs");
vi.mock("node:path");
vi.mock("node:process");
vi.mock("./get-route-id.js");

describe("write", () => {
  it("should write route references to a file with default options", () => {
    const routes: RouteReference[] = [
      { id: "home", path: "/" },
      { id: "about", path: "/about" },
    ];
    const options: Options = {};
    const currentDir = "/test/dir";
    const filePath = `${currentDir}/app/${DEFAULT_FILE_NAME}.${DEFAULT_FILE_TYPE}`;

    vi.mocked(cwd).mockReturnValue(currentDir);
    vi.mocked(join).mockImplementation((...args) => args.join("/"));
    vi.mocked(getRouteId).mockImplementation((route) => route.id);

    write(routes, options);

    const expectedRefs = {
      home: { id: "home", path: "/" },
      about: { id: "about", path: "/about" },
    };
    const expectedContent = EXPORTS.map((line) =>
      line.replace("$$", JSON.stringify(expectedRefs, null, 2))
    ).join("\n\n");

    expect(writeFileSync).toHaveBeenCalledWith(filePath, expectedContent, {
      encoding: "utf-8",
    });
  });

  it("should use custom file name and type from options", () => {
    const routes: RouteReference[] = [{ id: "custom", path: "/custom" }];
    const options: Options = { fileName: "custom-routes.js", fileType: "js" };
    const currentDir = "/custom/dir";
    const filePath = `${currentDir}/app/custom-routes.js`;

    vi.mocked(cwd).mockReturnValue(currentDir);
    vi.mocked(join).mockImplementation((...args) => args.join("/"));
    vi.mocked(getRouteId).mockReturnValue("custom");

    write(routes, options);

    const expectedRefs = {
      custom: { id: "custom", path: "/custom" },
    };
    const expectedContent = EXPORTS.map((line) =>
      line.replace("$$", JSON.stringify(expectedRefs, null, 2))
    ).join("\n\n");

    expect(writeFileSync).toHaveBeenCalledWith(filePath, expectedContent, {
      encoding: "utf-8",
    });
  });
});
