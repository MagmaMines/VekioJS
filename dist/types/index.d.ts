export type PrimitiveChild = string | number | boolean | null | undefined;
export type Child = VNode | PrimitiveChild | Child[];
export type Props = Record<string, any> & {
    children?: Child[];
    key?: string | number;
};
export type Component<P = any> = (props: P) => VNode | PrimitiveChild;
export type VNode = {
    type: string | Component | symbol;
    props: Props;
};
export type RenderMode = 'whole_screen' | 'screen_only';
export type FiberLane = 'urgent' | 'normal' | 'background' | 'transition';
export declare const FRAGMENT: unique symbol;
export declare const SUSPENSE: unique symbol;
export type EffectRecord = {
    deps?: any[];
    cleanup?: (() => void) | undefined;
    effect?: (() => void | (() => void)) | undefined;
};
//# sourceMappingURL=index.d.ts.map