import { beforeEach, describe, expect, it, vi } from "vitest";
import { generateRef } from "./generate-ref.js";

describe("generate-ref", () => {
  let importWithViteSpy: any, route: any;

  beforeEach(() => {
    route = {
      file: "./test.ts",
      path: "?locale/test",
    };
  });

  it("should remove .ts or .tsx from the file name to create an id", async () => {
    route.file = "test.tsx";
    const result = await generateRef(route);

    expect(result).toEqual({
      metadata: undefined,
      id: "test",
      path: "?locale/test",
    });
  });

  it("should run the routeMetadata function if provided", async () => {
    const routeMetadataFn = async () => {
      return {
        title: "Test Title",
        description: "Test Description",
      };
    };
    const routeMetadataFnSpy = vi.fn(routeMetadataFn);

    const result = await generateRef(route, routeMetadataFnSpy);
    expect(result).toEqual({
      metadata: {
        title: "Test Title",
        description: "Test Description",
      },
      id: "test",
      path: "?locale/test",
    });
    expect(routeMetadataFnSpy).toHaveBeenCalledWith("./test.ts");
  });
});
