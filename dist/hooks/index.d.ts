export declare function beginHooks(id: string): void;
export declare function useState<T>(initial: T): readonly [T, (v: any) => void];
export declare function useReducer<S, A>(reducer: (s: S, a: A) => S, initial: S): readonly [S, (action: A) => void];
export declare function useMemo<T>(factory: () => T, deps?: any[]): T;
export declare function useCallback<T extends Function>(fn: T, deps?: any[]): T;
export declare function useEffect(effect: () => void | (() => void), deps?: any[]): void;
export declare function useLayoutEffect(effect: () => void | (() => void), deps?: any[]): void;
export declare function useRef<T>(initial?: T | null): {
    current: T | null;
};
export declare function useImperativeHandle<T>(ref: {
    current: T | null;
}, create: () => T, deps?: any[]): void;
export declare function useDeferredValue<T>(value: T, timeout?: number): T;
export declare function cleanupHooks(id: string): void;
export declare function useSyncExternalStore<T>(subscribe: (cb: () => void) => () => void, getSnapshot: () => T): T;
export declare function useTransition(): readonly [boolean, (cb: () => void) => void];
//# sourceMappingURL=index.d.ts.map