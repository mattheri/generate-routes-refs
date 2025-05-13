import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { generateRef } from "./generate-ref.js";
import * as __viteImport from "./vite-import.js";

describe("generate-ref", () => {
  let importWithViteSpy: any, route: any;

  beforeEach(() => {
    route = {
      file: "test.ts",
      path: "?locale/test",
    };

    importWithViteSpy = vi.spyOn(__viteImport, "viteImport");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should try to import a route file", async () => {
    await generateRef(route);

    expect(importWithViteSpy).toHaveBeenCalledWith("test.ts");
  });

  it("should return the handle from the imported module", async () => {
    importWithViteSpy.mockImplementationOnce(() => {
      return {
        handle: "testHandle",
      };
    });

    const result = await generateRef(route);
    expect(result).toEqual({
      handle: "testHandle",
      id: "test",
      path: "?locale/test",
    });
  });

  it("should not throw an error if the file does not exist", async () => {
    importWithViteSpy.mockImplementationOnce(() => {
      throw new Error("file not found");
    });

    const result = await generateRef(route);
    expect(result).toEqual({
      handle: undefined,
      id: "test",
      path: "?locale/test",
    });
  });

  it("should remove .ts or .tsx from the file name to create an id", async () => {
    route.file = "test.tsx";
    const result = await generateRef(route);

    expect(result).toEqual({
      handle: undefined,
      id: "test",
      path: "?locale/test",
    });
  });
});
