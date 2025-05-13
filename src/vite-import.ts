type RouteModule = {
  default: () => Promise<{ default: () => Promise<unknown> }>;
  handle: unknown;
};

export const viteImport = (path: string): Promise<RouteModule> =>
  import(/* @vite-ignore */ `./app/${path}`);
