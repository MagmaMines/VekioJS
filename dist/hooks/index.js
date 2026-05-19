const buckets = new Map();
let currentId = 'global';
function getBucket(id = currentId) {
    if (!buckets.has(id)) {
        buckets.set(id, { states: [], memos: [], callbacks: [], effects: [], layoutEffects: [], refs: [], idx: 0 });
    }
    return buckets.get(id);
}
export function beginHooks(id) {
    currentId = id;
    getBucket(id).idx = 0;
}
function depsChanged(prev, next) {
    if (!prev || !next || prev.length !== next.length)
        return true;
    return next.some((d, i) => d !== prev[i]);
}
export function useState(initial) {
    const b = getBucket();
    const i = b.idx++;
    if (!(i in b.states))
        b.states[i] = initial;
    const set = (v) => { b.states[i] = typeof v === 'function' ? v(b.states[i]) : v; };
    return [b.states[i], set];
}
export function useReducer(reducer, initial) {
    const [state, setState] = useState(initial);
    const dispatch = (action) => setState((s) => reducer(s, action));
    return [state, dispatch];
}
export function useMemo(factory, deps = []) {
    const b = getBucket();
    const i = b.idx++;
    const slot = b.memos[i];
    if (!slot || depsChanged(slot.deps, deps))
        b.memos[i] = { value: factory(), deps };
    return b.memos[i].value;
}
export function useCallback(fn, deps = []) {
    const b = getBucket();
    const i = b.idx++;
    const slot = b.callbacks[i];
    if (!slot || depsChanged(slot.deps, deps))
        b.callbacks[i] = { fn, deps };
    return b.callbacks[i].fn;
}
export function useEffect(effect, deps = []) {
    const b = getBucket();
    const i = b.idx++;
    const slot = b.effects[i];
    if (!slot || depsChanged(slot.deps, deps)) {
        if (slot?.cleanup)
            slot.cleanup();
        const cleanup = effect() || undefined;
        b.effects[i] = { deps, cleanup, effect };
    }
}
export function useLayoutEffect(effect, deps = []) {
    const b = getBucket();
    const i = b.idx++;
    const slot = b.layoutEffects[i];
    if (!slot || depsChanged(slot.deps, deps)) {
        if (slot?.cleanup)
            slot.cleanup();
        const cleanup = effect() || undefined;
        b.layoutEffects[i] = { deps, cleanup, effect };
    }
}
export function useRef(initial = null) {
    const b = getBucket();
    const i = b.idx++;
    if (!(i in b.refs))
        b.refs[i] = { current: initial };
    return b.refs[i];
}
export function useImperativeHandle(ref, create, deps = []) {
    const value = useMemo(create, deps);
    ref.current = value;
}
export function useDeferredValue(value, timeout = 16) {
    const [state, setState] = useState(value);
    setTimeout(() => setState(value), timeout);
    return state;
}
export function cleanupHooks(id) {
    const b = buckets.get(id);
    if (!b)
        return;
    [...b.effects, ...b.layoutEffects].forEach(e => e?.cleanup?.());
    buckets.delete(id);
}
export function useSyncExternalStore(subscribe, getSnapshot) {
    const [state, setState] = useState(getSnapshot());
    useEffect(() => {
        const unsub = subscribe(() => setState(getSnapshot()));
        return () => unsub?.();
    }, [subscribe, getSnapshot]);
    return state;
}
export function useTransition() {
    const [pending, setPending] = useState(false);
    const start = (cb) => {
        setPending(true);
        queueMicrotask(() => {
            cb();
            setPending(false);
        });
    };
    return [pending, start];
}
//# sourceMappingURL=index.js.map