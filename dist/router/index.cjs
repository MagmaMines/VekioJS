exports.Router = Router; {
    routes = [];
    middlewares = [];
    register(pattern, handler) { this.routes.push({ pattern, handler }); }
    use(mw) { this.middlewares.push(mw); }
    match(pattern, path) {
        const p = pattern.split('/').filter(Boolean);
        const v = path.split('/').filter(Boolean);
        if (p.length !== v.length)
            return null;
        const params = {};
        for (let i = 0; i < p.length; i++) {
            if (p[i].startsWith(':'))
                params[p[i].slice(1)] = decodeURIComponent(v[i]);
            else if (p[i] !== v[i])
                return null;
        }
        return params;
    }
    resolve(rawPath) {
        const path = this.middlewares.reduce((acc, mw) => mw(acc), rawPath);
        for (const route of this.routes) {
            const params = this.match(route.pattern, path);
            if (params)
                return route.handler(params);
        }
        return null;
    }
}
//# sourceMappingURL=index.js.map