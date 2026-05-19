type RouteHandler = (params: Record<string, string>) => any;

export class Router {
  private routes: Array<{ pattern: string; handler: RouteHandler }> = [];
  private middlewares: Array<(path: string) => string> = [];

  register(pattern: string, handler: RouteHandler) { this.routes.push({ pattern, handler }); }
  use(mw: (path: string) => string) { this.middlewares.push(mw); }

  private match(pattern: string, path: string) {
    const p = pattern.split('/').filter(Boolean);
    const v = path.split('/').filter(Boolean);
    if (p.length !== v.length) return null;
    const params: Record<string, string> = {};
    for (let i = 0; i < p.length; i++) {
      if (p[i].startsWith(':')) params[p[i].slice(1)] = decodeURIComponent(v[i]);
      else if (p[i] !== v[i]) return null;
    }
    return params;
  }

  resolve(rawPath: string) {
    const path = this.middlewares.reduce((acc, mw) => mw(acc), rawPath);
    for (const route of this.routes) {
      const params = this.match(route.pattern, path);
      if (params) return route.handler(params);
    }
    return null;
  }
}
