/**
 * VekioJS Runtime 4.4
 * Enterprise-focused runtime facade with concurrent lanes, batching, suspense/lazy, memo, and sender pipeline.
 */
import { Renderer, Scheduler } from '../renderer/index.js';
import { renderToString, renderToStream, hydrateFromString, renderToReadableStream } from '../ssr/index.js';
import { resolveStylePresets, getJSPreset, listPresetStats, getHTMLPreset, createTailwindJITLayer, compose, getThemeVars } from '../presets/index.js';
import { DevtoolsInspector } from '../devtools/index.js';
import type { Props, VNode, FiberLane } from '../types/index.js';
import { FRAGMENT, SUSPENSE } from '../types/index.js';
import { beginHooks } from '../hooks/index.js';

const __DEV__ = (globalThis as any).__VEKIO_DEV__ ?? false;
const devtools = new DevtoolsInspector();
const renderer = new Renderer(new Scheduler());

type RenderOpts = { mode?: 'whole_screen' | 'screen_only'; dom?: boolean; lane?: FiberLane; watch?: () => boolean };
const stateBatchQueue: Array<() => void> = [];
let batchScheduled = false;

function invariant(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(`[VekioRuntime] ${message}`);
}

function flushBatch() {
  const tasks = stateBatchQueue.splice(0, stateBatchQueue.length);
  tasks.forEach(task => task());
  batchScheduled = false;
}

function enqueueBatch(task: () => void) {
  stateBatchQueue.push(task);
  if (!batchScheduled) {
    batchScheduled = true;
    queueMicrotask(flushBatch);
  }
}

function normalizeChildren(children: any[]): any[] {
  return children.flat(Infinity as any).filter(child => child !== false && child !== null && child !== undefined);
}

/** JSX-compatible element factory. */
function createElement(type: any, props: Props = {}, ...children: any[]): VNode {
  invariant(type, 'createElement requires a `type` argument.');
  return { type, props: { ...props, children: normalizeChildren(children) } };
}

function Fragment(props: Props = {}) { return { type: FRAGMENT, props }; }
function Suspense(props: Props = {}) { return { type: SUSPENSE, props }; }

/**
 * Memoized component wrapper.
 */
function memo(component: any, areEqual?: (prev: any, next: any) => boolean) {
  let prevProps: any = null;
  let prevVNode: any = null;
  return (props: any) => {
    const equal = prevVNode && (areEqual ? areEqual(prevProps, props) : JSON.stringify(prevProps) === JSON.stringify(props));
    if (equal) return prevVNode;
    prevProps = props;
    prevVNode = component(props);
    return prevVNode;
  };
}

function startTransition(callback: () => void) {
  invariant(typeof callback === 'function', 'startTransition expects a callback function.');
  renderer.render('screen_only', callback, 'transition');
}

function lazy(loader: () => Promise<{ default: any }>) {
  let comp: any = null;
  let err: any = null;
  let pending: Promise<any> | null = null;
  return (props: any) => {
    if (err) return createElement('pre', {}, `Lazy load error: ${String(err)}`);
    if (comp) return comp(props);
    if (!pending) pending = loader().then(mod => { comp = mod.default; }).catch(e => { err = e; });
    return createElement('span', {}, 'Loading...');
  };
}

function render(node: VNode, container: HTMLElement, opts: RenderOpts = {}) {
  invariant(container && typeof container === 'object', 'render requires a valid container HTMLElement.');
  const mode = opts.mode || 'whole_screen';
  const lane = opts.lane || 'normal';
  if (opts.watch && !opts.watch()) {
    if (__DEV__) devtools.track('sender:defer', { mode, lane });
    return 0;
  }

  if (opts.dom) {
    const html = renderToString(node);
    enqueueBatch(() => renderer.renderDOM(container, html, lane));
    if (__DEV__) devtools.track('render:dom', { mode, lane });
    return 1;
  }

  if (__DEV__) devtools.track('render:vdom', { mode, lane });
  return renderer.renderVDOM(node);
}

function renderComponent(component: any, props: any = {}, id = 'cmp') {
  beginHooks(id);
  return component(props);
}

function senderPipeline(tasks: Array<{ id: string; run: () => void; watch?: () => boolean; lane?: FiberLane }>) {
  const loaded: string[] = [];
  tasks.forEach(task => {
    invariant(typeof task.run === 'function', `senderPipeline task '${task.id}' requires a run() function.`);
    if (task.watch && !task.watch()) {
      if (__DEV__) devtools.track('sender:skip', { id: task.id });
      return;
    }
    renderer.render('screen_only', task.run, task.lane || 'background');
    loaded.push(task.id);
  });
  return loaded;
}

function preload(loader: () => Promise<any>) {
  invariant(typeof loader === 'function', 'preload expects a function that returns a Promise.');
  return loader();
}

export const Vekio = {
  version: '4.4.0',
  createElement,
  Fragment,
  Suspense,
  lazy,
  memo,
  startTransition,
  render,
  renderComponent,
  renderToString,
  renderToStream,
  renderToReadableStream,
  hydrateFromString,
  resolveStylePresets,
  compose,
  getThemeVars,
  getJSPreset,
  getHTMLPreset,
  createTailwindJITLayer,
  listPresetStats,
  reconcileChildrenByKey: (prev: VNode[], next: VNode[]) => renderer.reconcileChildrenByKey(prev, next),
  senderPipeline,
  preload,
  devtools: __DEV__ ? devtools : null
};
