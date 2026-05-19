export declare function createContext<T>(defaultValue: T): {
    Provider: ({ value, children }: {
        value: T;
        children: any;
    }) => any;
    useContext: () => T;
    key: symbol;
};
//# sourceMappingURL=index.d.ts.map