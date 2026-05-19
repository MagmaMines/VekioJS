export declare const ReactCompat: {
    createElement: (type: any, props?: import("../index.js").Props, ...children: any[]) => import("../index.js").VNode;
    Fragment: (props?: import("../index.js").Props) => {
        type: symbol;
        props: import("../index.js").Props;
    };
    memo: (component: any, areEqual?: (prev: any, next: any) => boolean) => (props: any) => any;
    startTransition: (callback: () => void) => void;
};
export declare const createElement: (type: any, props?: import("../index.js").Props, ...children: any[]) => import("../index.js").VNode;
export declare const Fragment: (props?: import("../index.js").Props) => {
    type: symbol;
    props: import("../index.js").Props;
};
//# sourceMappingURL=react.d.ts.map