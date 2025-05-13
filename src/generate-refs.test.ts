import type { RouteConfigEntry } from "@react-router/dev/routes";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as __generateRef from "./generate-ref.js";
import { generateRefs } from "./generate-refs.js";

describe("generate-refs", () => {
  let generateRefSpy: any, generateRefsSpy: any, routes: RouteConfigEntry[];

  beforeEach(() => {
    generateRefSpy = vi.spyOn(__generateRef, "generateRef");
    generateRefsSpy = vi.spyOn({ generateRefs }, "generateRefs");

    routes = [
      {
        file: "layout-test.ts",
      },
      {
        file: "test.ts",
        id: "test",
        path: "?locale/test",
      },
      {
        file: "test-children.ts",
        id: "test-children",
        path: "?locale/test-children",
        children: [
          {
            file: "test-children-1.ts",
            id: "test-children-1",
          },
          {
            file: "test-children-2.ts",
            id: "test-children-2",
          },
        ],
      },
    ];
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call generateRef for each route when it has a path", async () => {
    await generateRefs(routes);

    for (const route of routes) {
      if (route.path) {
        expect(generateRefSpy).toHaveBeenCalledWith(route);
      } else {
        expect(generateRefSpy).not.toHaveBeenCalledWith(route);
      }
    }
  });
});
