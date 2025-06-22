import type { RouteConfigEntry } from "@react-router/dev/routes";
import { afterEach, describe, expect, it, vi } from "vitest";
import { generateRef } from "./generate-ref.js";
import { generateRefs } from "./generate-refs.js";
import type { RouteReference } from "./types.js";

vi.mock("./generate-ref.js");

afterEach(() => {
  vi.clearAllMocks();
});

describe("generateRefs", () => {
  it("should generate references for a flat list of routes", async () => {
    const routes: RouteConfigEntry[] = [
      { file: "a.ts", path: "/a" },
      { file: "b.ts", path: "/b" },
    ];
    const mockRefA: RouteReference = { id: "a", path: "/a" };
    const mockRefB: RouteReference = { id: "b", path: "/b" };

    vi.mocked(generateRef)
      .mockResolvedValueOnce(mockRefA)
      .mockResolvedValueOnce(mockRefB);

    const refs = await generateRefs(routes);
    expect(vi.mocked(generateRef)).toHaveBeenCalledTimes(2);
    expect(refs).toEqual([mockRefA, mockRefB]);
  });

  it("should handle nested routes", async () => {
    const routes: RouteConfigEntry[] = [
      {
        file: "parent.ts",
        path: "/parent",
        children: [{ file: "child.ts", path: "child" }],
      },
    ];
    const mockRefParent: RouteReference = { id: "parent", path: "/parent" };
    const mockRefChild: RouteReference = { id: "child", path: "child" };

    vi.mocked(generateRef)
      .mockResolvedValueOnce(mockRefParent)
      .mockResolvedValueOnce(mockRefChild);

    const refs = await generateRefs(routes);
    expect(vi.mocked(generateRef)).toHaveBeenCalledTimes(2);
    expect(refs).toEqual([mockRefParent, mockRefChild]);
  });

  it("should handle an empty array of routes", async () => {
    const routes: RouteConfigEntry[] = [];
    const refs = await generateRefs(routes);
    expect(refs).toEqual([]);
    expect(vi.mocked(generateRef)).not.toHaveBeenCalled();
  });

  it("should skip routes without a path but process their children", async () => {
    const routes: RouteConfigEntry[] = [
      {
        file: "layout.ts",
        children: [{ file: "child.ts", path: "/child" }],
      },
    ];
    const mockRefChild: RouteReference = { id: "child", path: "/child" };
    vi.mocked(generateRef).mockResolvedValueOnce(mockRefChild);

    const refs = await generateRefs(routes);
    expect(vi.mocked(generateRef)).toHaveBeenCalledTimes(1);
    expect(refs).toEqual([mockRefChild]);
  });
});
