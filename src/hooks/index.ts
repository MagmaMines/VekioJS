import type { EffectRecord } from '../types/index.js';

type HookBucket = {
  states: any[];
  memos: Array<{ value: any; deps?: any[] }>;
  callbacks: Array<{ fn: Function; deps?: any[] }>;
  effects: EffectRecord[];
  layoutEffects: EffectRecord[];
  refs: any[];
  idx: number;
};

const buckets = new Map<string, HookBucket>();
let currentId = 'global';

function getBucket(id = currentId): HookBucket {
  if (!buckets.has(id)) {
    buckets.set(id, { states: [], memos: [], callbacks: [], effects: [], layoutEffects: [], refs: [], idx: 0 });
  }
  return buckets.get(id)!;
}

export function beginHooks(id: string) {
  currentId = id;
  getBucket(id).idx = 0;
}

function depsChanged(prev?: any[], next?: any[]) {
  if (!prev || !next || prev.length !== next.length) return true;
  return next.some((d, i) => d !== prev[i]);
}

export function useState<T>(initial: T) {
  const b = getBucket();
  const i = b.idx++;
  if (!(i in b.states)) b.states[i] = initial;
  const set = (v: any) => { b.states[i] = typeof v === 'function' ? v(b.states[i]) : v; };
  return [b.states[i] as T, set] as const;
}

export function useReducer<S, A>(reducer: (s: S, a: A) => S, initial: S) {
  const [state, setState] = useState(initial);
  const dispatch = (action: A) => setState((s: S) => reducer(s, action));
  return [state, dispatch] as const;
}

export function useMemo<T>(factory: () => T, deps: any[] = []) {
  const b = getBucket();
  const i = b.idx++;
  const slot = b.memos[i];
  if (!slot || depsChanged(slot.deps, deps)) b.memos[i] = { value: factory(), deps };
  return b.memos[i].value as T;
}

export function useCallback<T extends Function>(fn: T, deps: any[] = []) {
  const b = getBucket();
  const i = b.idx++;
  const slot = b.callbacks[i];
  if (!slot || depsChanged(slot.deps, deps)) b.callbacks[i] = { fn, deps };
  return b.callbacks[i].fn as T;
}

export function useEffect(effect: () => void | (() => void), deps: any[] = []) {
  const b = getBucket();
  const i = b.idx++;
  const slot = b.effects[i];
  if (!slot || depsChanged(slot.deps, deps)) {
    if (slot?.cleanup) slot.cleanup();
    const cleanup = effect() || undefined;
    b.effects[i] = { deps, cleanup, effect };
  }
}

export function useLayoutEffect(effect: () => void | (() => void), deps: any[] = []) {
  const b = getBucket();
  const i = b.idx++;
  const slot = b.layoutEffects[i];
  if (!slot || depsChanged(slot.deps, deps)) {
    if (slot?.cleanup) slot.cleanup();
    const cleanup = effect() || undefined;
    b.layoutEffects[i] = { deps, cleanup, effect };
  }
}

export function useRef<T>(initial: T | null = null) {
  const b = getBucket();
  const i = b.idx++;
  if (!(i in b.refs)) b.refs[i] = { current: initial as T | null };
  return b.refs[i] as { current: T | null };
}

export function useImperativeHandle<T>(ref: { current: T | null }, create: () => T, deps: any[] = []) {
  const value = useMemo(create, deps);
  ref.current = value;
}

export function useDeferredValue<T>(value: T, timeout = 16) {
  const [state, setState] = useState(value);
  setTimeout(() => setState(value), timeout);
  return state;
}

export function cleanupHooks(id: string) {
  const b = buckets.get(id);
  if (!b) return;
  [...b.effects, ...b.layoutEffects].forEach(e => e?.cleanup?.());
  buckets.delete(id);
}


export function useSyncExternalStore<T>(subscribe:(cb:()=>void)=>()=>void, getSnapshot:()=>T) {
  const [state, setState] = useState(getSnapshot());
  useEffect(() => {
    const unsub = subscribe(() => setState(getSnapshot()));
    return () => unsub?.();
  }, [subscribe, getSnapshot]);
  return state;
}

export function useTransition() {
  const [pending, setPending] = useState(false);
  const start = (cb:()=>void) => {
    setPending(true);
    queueMicrotask(() => {
      cb();
      setPending(false);
    });
  };
  return [pending, start] as const;
}
