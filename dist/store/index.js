export function createStore(initial) {
    let state = { ...initial };
    const subs = new Set();
    return {
        getState: () => state,
        setState: (partial) => {
            const patch = typeof partial === 'function' ? partial(state) : partial;
            state = { ...state, ...patch };
            subs.forEach(fn => fn(state));
        },
        subscribe: (fn) => {
            subs.add(fn);
            return () => subs.delete(fn);
        }
    };
}
//# sourceMappingURL=index.js.map