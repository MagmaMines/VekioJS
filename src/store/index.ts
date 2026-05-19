/** Simple official VekioStore with subscription semantics. */
export function createStore<T extends Record<string, any>>(initial: T) {
  let state = { ...initial };
  const subs = new Set<(s: T) => void>();
  return {
    getState: () => state,
    setState: (partial: Partial<T> | ((prev: T) => Partial<T>)) => {
      const patch = typeof partial === 'function' ? partial(state) : partial;
      state = { ...state, ...patch };
      subs.forEach(fn => fn(state));
    },
    subscribe: (fn: (s: T) => void) => {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
}
