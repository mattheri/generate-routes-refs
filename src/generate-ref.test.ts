import type { RouteConfigEntry } from "@react-router/dev/routes";
import { describe, expect, it, vi } from "vitest";
import { generateRef } from "./generate-ref.js";
import { getRouteParams } from "./get-route-params.js";

vi.mock("./get-route-params.js");

describe("generateRef", () => {
  it("should generate a basic route reference", async () => {
    const route: RouteConfigEntry = {
      file: "./routes/home.tsx",
      path: "/",
    };
    vi.mocked(getRouteParams).mockReturnValue([]);

    const ref = await generateRef(route);

    expect(ref).toEqual({
      id: "routes/home",
      metadata: undefined,
      path: "/",
      params: [],
    });
  });

  it("should use the route id if provided", async () => {
    const route: RouteConfigEntry = {
      id: "custom-id",
      file: "./routes/about.tsx",
      path: "/about",
    };
    vi.mocked(getRouteParams).mockReturnValue([]);

    const ref = await generateRef(route);

    expect(ref).toEqual({
      id: "custom-id",
      metadata: undefined,
      path: "/about",
      params: [],
    });
  });

  it("should call routeMetadataFn and include metadata", async () => {
    const route: RouteConfigEntry = {
      file: "./routes/profile.tsx",
      path: "/profile",
    };
    const routeMetadataFn = vi.fn().mockResolvedValue({ some: "data" });
    vi.mocked(getRouteParams).mockReturnValue([]);

    const ref = await generateRef(route, routeMetadataFn);

    expect(routeMetadataFn).toHaveBeenCalledWith("./routes/profile.tsx");
    expect(ref).toEqual({
      id: "routes/profile",
      metadata: { some: "data" },
      path: "/profile",
      params: [],
    });
  });

  it("should handle routes with parameters", async () => {
    const route: RouteConfigEntry = {
      file: "./routes/users/[id].tsx",
      path: "/users/:id",
    };
    const params = [{ name: "id", optional: false }];
    vi.mocked(getRouteParams).mockReturnValue(params);

    const ref = await generateRef(route);

    expect(ref).toEqual({
      id: "routes/users/[id]",
      metadata: undefined,
      path: "/users/:id",
      params,
    });
  });
});
