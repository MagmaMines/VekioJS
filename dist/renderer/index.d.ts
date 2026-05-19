import type { VNode, RenderMode, FiberLane } from '../types/index.js';
export declare class Scheduler {
    private queues;
    enqueue(task: () => void, lane?: FiberLane): void;
    flush(limit?: number): number;
}
export declare class Renderer {
    private scheduler;
    constructor(scheduler?: Scheduler);
    renderDOM(node: HTMLElement, html: string, lane?: FiberLane): number;
    renderVDOM(vnode: VNode): VNode;
    reconcileChildrenByKey(prev?: VNode[], next?: VNode[]): ({
        type: string;
        key: string;
        to: number;
        prev: undefined;
        next: VNode;
        from?: never;
    } | {
        type: string;
        key: string;
        from: number;
        to: number;
        prev: VNode;
        next: VNode;
    })[];
    render(mode: RenderMode, task: () => void, lane?: FiberLane): void;
}
//# sourceMappingURL=index.d.ts.map