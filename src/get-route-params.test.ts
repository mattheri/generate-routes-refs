import type { RouteConfigEntry } from "@react-router/dev/routes";
import { describe, expect, it } from "vitest";
import { getRouteParams } from "./get-route-params.js";

describe("getRouteParams", () => {
  it("should return an empty array for a route with no parameters", () => {
    const route: RouteConfigEntry = { file: "", path: "/users/profile" };
    expect(getRouteParams(route)).toEqual([]);
  });

  it("should extract a single required parameter", () => {
    const route: RouteConfigEntry = { file: "", path: "/users/:id" };
    expect(getRouteParams(route)).toEqual([{ name: "id", optional: false }]);
  });

  it("should extract a single optional parameter", () => {
    const route: RouteConfigEntry = { file: "", path: "/users/:id?" };
    expect(getRouteParams(route)).toEqual([{ name: "id", optional: true }]);
  });

  it("should extract multiple required and optional parameters", () => {
    const route: RouteConfigEntry = {
      file: "",
      path: "/posts/:postId/comments/:commentId?",
    };
    expect(getRouteParams(route)).toEqual([
      { name: "postId", optional: false },
      { name: "commentId", optional: true },
    ]);
  });

  it("should return an empty array if route path is undefined", () => {
    const route: RouteConfigEntry = { file: "", path: undefined };
    expect(getRouteParams(route)).toEqual([]);
  });

  it("should return an empty array for an empty route path", () => {
    const route: RouteConfigEntry = { file: "", path: "" };
    expect(getRouteParams(route)).toEqual([]);
  });

  it("should handle complex path segments correctly", () => {
    const route: RouteConfigEntry = {
      file: "",
      path: "/search/:query/category/:cat?/sort/:sortBy",
    };
    expect(getRouteParams(route)).toEqual([
      { name: "query", optional: false },
      { name: "cat", optional: true },
      { name: "sortBy", optional: false },
    ]);
  });
});
