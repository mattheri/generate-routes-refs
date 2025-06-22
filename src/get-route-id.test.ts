import { describe, expect, it } from "vitest";
import { getRouteId } from "./get-route-id.js";
import type { Options, RouteReference } from "./types.js";

describe("getRouteId", () => {
  it("should return the route path when removeFromRouteKey is not provided", () => {
    const route: RouteReference = { id: "test", path: "/users/profile" };
    const options: Options = {};
    expect(getRouteId(route, options)).toBe("/users/profile");
  });

  it("should remove the specified part from the route path", () => {
    const route: RouteReference = { id: "test", path: "/users/profile" };
    const options: Options = { removeFromRouteKey: "/users" };
    expect(getRouteId(route, options)).toBe("/profile");
  });

  it("should return the full route path if removeFromRouteKey does not match", () => {
    const route: RouteReference = { id: "test", path: "/users/profile" };
    const options: Options = { removeFromRouteKey: "/admin" };
    expect(getRouteId(route, options)).toBe("/users/profile");
  });

  it("should return an empty string if route path is undefined", () => {
    const route: RouteReference = { id: "test", path: undefined };
    const options: Options = {};
    expect(getRouteId(route, options)).toBe("");
  });

  it("should return an empty string if route path is an empty string", () => {
    const route: RouteReference = { id: "test", path: "" };
    const options: Options = {};
    expect(getRouteId(route, options)).toBe("");
  });

  it("should handle complex removals", () => {
    const route: RouteReference = { id: "test", path: "a/b/c/d/e" };
    const options: Options = { removeFromRouteKey: "a/b/c" };
    expect(getRouteId(route, options)).toBe("/d/e");
  });

  it("should return an empty string if the whole path is removed", () => {
    const route: RouteReference = { id: "test", path: "/users/profile" };
    const options: Options = { removeFromRouteKey: "/users/profile" };
    expect(getRouteId(route, options)).toBe("");
  });
});
