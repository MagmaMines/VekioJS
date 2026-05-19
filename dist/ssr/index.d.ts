import type { VNode } from '../types/index.js';
export declare function renderToString(node: VNode | string | number | boolean | null | undefined): string;
export declare function renderToStream(node: VNode | string): Promise<ReadableStream<string>>;
export declare function hydrateFromString(container: HTMLElement, html: string): number;
export declare function renderToReadableStream(node: VNode | string): Promise<ReadableStream<string>>;
//# sourceMappingURL=index.d.ts.map