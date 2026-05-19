export declare function createStore<T extends Record<string, any>>(initial: T): {
    getState: () => T;
    setState: (partial: Partial<T> | ((prev: T) => Partial<T>)) => void;
    subscribe: (fn: (s: T) => void) => () => boolean;
};
//# sourceMappingURL=index.d.ts.map