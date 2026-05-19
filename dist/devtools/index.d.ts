export type DevtoolsEvent = {
    type: string;
    payload?: any;
    ts: number;
};
export type ComponentNode = {
    id: string;
    name: string;
    parentId?: string;
    props?: Record<string, any>;
    hookState?: any[];
};
export declare class DevtoolsInspector {
    private events;
    private componentTree;
    track(type: string, payload?: any): void;
    snapshot(): DevtoolsEvent[];
    clear(): void;
    registerComponent(node: ComponentNode): void;
    updateHookState(id: string, hooks: any[]): void;
    getComponentTree(): ComponentNode[];
}
//# sourceMappingURL=index.d.ts.map