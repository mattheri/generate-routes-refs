import type { RouteConfig, RouteConfigEntry } from "@react-router/dev/routes";
import { afterEach, describe, expect, it, vi } from "vitest";
import { generateRefs } from "./generate-refs.js";
import { generateRoutesRef } from "./generate-routes-ref.js";
import type { Options, RouteReference } from "./types.js";
import { write } from "./write.js";

vi.mock("./generate-refs.js");
vi.mock("./write.js");

afterEach(() => {
  vi.clearAllMocks();
});

describe("generateRoutesRef", () => {
  it("should orchestrate the generation and writing of route references", async () => {
    const routeEntries: RouteConfigEntry[] = [{ file: "a.ts", path: "/a" }];
    const routesConfig: RouteConfig = Promise.resolve(routeEntries);
    const options: Options = { fileName: "test.ts" };
    const mockRefs: RouteReference[] = [{ id: "a", path: "/a" }];

    vi.mocked(generateRefs).mockResolvedValue(mockRefs);

    await generateRoutesRef(routesConfig, options);

    expect(generateRefs).toHaveBeenCalledWith(
      routeEntries,
      options.routeMetadata
    );
    expect(write).toHaveBeenCalledWith(mockRefs, options);
  });
});
