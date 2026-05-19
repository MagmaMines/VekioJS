type RouteHandler = (params: Record<string, string>) => any;
export declare class Router {
    private routes;
    private middlewares;
    register(pattern: string, handler: RouteHandler): void;
    use(mw: (path: string) => string): void;
    private match;
    resolve(rawPath: string): any;
}
export {};
//# sourceMappingURL=index.d.ts.map