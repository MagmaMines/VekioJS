import { renderToString, renderToStream, hydrateFromString, renderToReadableStream } from '../ssr/index.js';
import { resolveStylePresets, getJSPreset, listPresetStats, getHTMLPreset, createTailwindJITLayer, compose, getThemeVars } from '../presets/index.js';
import { DevtoolsInspector } from '../devtools/index.js';
import type { Props, VNode, FiberLane } from '../types/index.js';
type RenderOpts = {
    mode?: 'whole_screen' | 'screen_only';
    dom?: boolean;
    lane?: FiberLane;
    watch?: () => boolean;
};
declare function createElement(type: any, props?: Props, ...children: any[]): VNode;
declare function Fragment(props?: Props): {
    type: symbol;
    props: Props;
};
declare function Suspense(props?: Props): {
    type: symbol;
    props: Props;
};
declare function memo(component: any, areEqual?: (prev: any, next: any) => boolean): (props: any) => any;
declare function startTransition(callback: () => void): void;
declare function lazy(loader: () => Promise<{
    default: any;
}>): (props: any) => any;
declare function render(node: VNode, container: HTMLElement, opts?: RenderOpts): VNode | 1 | 0;
declare function renderComponent(component: any, props?: any, id?: string): any;
declare function senderPipeline(tasks: Array<{
    id: string;
    run: () => void;
    watch?: () => boolean;
    lane?: FiberLane;
}>): string[];
declare function preload(loader: () => Promise<any>): Promise<any>;
export declare const Vekio: {
    version: string;
    createElement: typeof createElement;
    Fragment: typeof Fragment;
    Suspense: typeof Suspense;
    lazy: typeof lazy;
    memo: typeof memo;
    startTransition: typeof startTransition;
    render: typeof render;
    renderComponent: typeof renderComponent;
    renderToString: typeof renderToString;
    renderToStream: typeof renderToStream;
    renderToReadableStream: typeof renderToReadableStream;
    hydrateFromString: typeof hydrateFromString;
    resolveStylePresets: typeof resolveStylePresets;
    compose: typeof compose;
    getThemeVars: typeof getThemeVars;
    getJSPreset: typeof getJSPreset;
    getHTMLPreset: typeof getHTMLPreset;
    createTailwindJITLayer: typeof createTailwindJITLayer;
    listPresetStats: typeof listPresetStats;
    reconcileChildrenByKey: (prev: VNode[], next: VNode[]) => ({
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
    senderPipeline: typeof senderPipeline;
    preload: typeof preload;
    devtools: DevtoolsInspector | null;
};
export {};
//# sourceMappingURL=index.d.ts.map