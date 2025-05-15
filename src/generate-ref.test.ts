import { beforeEach, describe, expect, it } from "vitest";
import { generateRef } from "./generate-ref.js";

describe("generate-ref", () => {
  let importWithViteSpy: any, route: any;

  beforeEach(() => {
    route = {
      file: "./test.ts",
      path: "?locale/test",
    };
  });

  it("should remove .ts or .tsx from the file name to create an id", () => {
    route.file = "test.tsx";
    const result = generateRef(route);

    expect(result).toEqual({
      handle: undefined,
      id: "test",
      path: "?locale/test",
    });
  });
});
