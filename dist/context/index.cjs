const CONTEXT_STACK = new Map();
exports.createContext = createContext;(defaultValue) {
    const key = Symbol('context');
    CONTEXT_STACK.set(key, [defaultValue]);
    function Provider({ value, children }) {
        const stack = CONTEXT_STACK.get(key);
        stack.push(value);
        const out = children;
        stack.pop();
        return out;
    }
    function useContext() {
        const stack = CONTEXT_STACK.get(key);
        return stack[stack.length - 1];
    }
    return { Provider, useContext, key };
}
//# sourceMappingURL=index.js.map