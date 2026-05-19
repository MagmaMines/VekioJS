const { Renderer, Scheduler } = require('../renderer/index.js');;
const { renderToString, renderToStream, hydrateFromString, renderToReadableStream } = require('../ssr/index.js');;
const { resolveStylePresets, getJSPreset, listPresetStats, getHTMLPreset, createTailwindJITLayer, compose, getThemeVars } = require('../presets/index.js');;
const { DevtoolsInspector } = require('../devtools/index.js');;
const { FRAGMENT, SUSPENSE } = require('../types/index.js');;
const { beginHooks } = require('../hooks/index.js');;
const __DEV__ = globalThis.__VEKIO_DEV__ ?? false;
const devtools = new DevtoolsInspector();
const renderer = new Renderer(new Scheduler());
const stateBatchQueue = [];
let batchScheduled = false;
function invariant(condition, message) {
    if (!condition)
        throw new Error(`[VekioRuntime] ${message}`);
}
function flushBatch() {
    const tasks = stateBatchQueue.splice(0, stateBatchQueue.length);
    tasks.forEach(task => task());
    batchScheduled = false;
}
function enqueueBatch(task) {
    stateBatchQueue.push(task);
    if (!batchScheduled) {
        batchScheduled = true;
        queueMicrotask(flushBatch);
    }
}
function normalizeChildren(children) {
    return children.flat(Infinity).filter(child => child !== false && child !== null && child !== undefined);
}
function createElement(type, props = {}, ...children) {
    invariant(type, 'createElement requires a `type` argument.');
    return { type, props: { ...props, children: normalizeChildren(children) } };
}
function Fragment(props = {}) { return { type: FRAGMENT, props }; }
function Suspense(props = {}) { return { type: SUSPENSE, props }; }
function memo(component, areEqual) {
    let prevProps = null;
    let prevVNode = null;
    return (props) => {
        const equal = prevVNode && (areEqual ? areEqual(prevProps, props) : JSON.stringify(prevProps) === JSON.stringify(props));
        if (equal)
            return prevVNode;
        prevProps = props;
        prevVNode = component(props);
        return prevVNode;
    };
}
function startTransition(callback) {
    invariant(typeof callback === 'function', 'startTransition expects a callback function.');
    renderer.render('screen_only', callback, 'transition');
}
function lazy(loader) {
    let comp = null;
    let err = null;
    let pending = null;
    return (props) => {
        if (err)
            return createElement('pre', {}, `Lazy load error: ${String(err)}`);
        if (comp)
            return comp(props);
        if (!pending)
            pending = loader().then(mod => { comp = mod.default; }).catch(e => { err = e; });
        return createElement('span', {}, 'Loading...');
    };
}
function render(node, container, opts = {}) {
    invariant(container && typeof container === 'object', 'render requires a valid container HTMLElement.');
    const mode = opts.mode || 'whole_screen';
    const lane = opts.lane || 'normal';
    if (opts.watch && !opts.watch()) {
        if (__DEV__)
            devtools.track('sender:defer', { mode, lane });
        return 0;
    }
    if (opts.dom) {
        const html = renderToString(node);
        enqueueBatch(() => renderer.renderDOM(container, html, lane));
        if (__DEV__)
            devtools.track('render:dom', { mode, lane });
        return 1;
    }
    if (__DEV__)
        devtools.track('render:vdom', { mode, lane });
    return renderer.renderVDOM(node);
}
function renderComponent(component, props = {}, id = 'cmp') {
    beginHooks(id);
    return component(props);
}
function senderPipeline(tasks) {
    const loaded = [];
    tasks.forEach(task => {
        invariant(typeof task.run === 'function', `senderPipeline task '${task.id}' requires a run() function.`);
        if (task.watch && !task.watch()) {
            if (__DEV__)
                devtools.track('sender:skip', { id: task.id });
            return;
        }
        renderer.render('screen_only', task.run, task.lane || 'background');
        loaded.push(task.id);
    });
    return loaded;
}
function preload(loader) {
    invariant(typeof loader === 'function', 'preload expects a function that returns a Promise.');
    return loader();
}
exports.Vekio = Vekio; = {
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
    reconcileChildrenByKey: (prev, next) => renderer.reconcileChildrenByKey(prev, next),
    senderPipeline,
    preload,
    devtools: __DEV__ ? devtools : null
};
//# sourceMappingURL=index.js.map