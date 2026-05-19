const CONTEXT_STACK = new Map<symbol, any[]>();

export function createContext<T>(defaultValue: T) {
  const key = Symbol('context');
  CONTEXT_STACK.set(key, [defaultValue]);

  function Provider({ value, children }: { value: T; children: any }) {
    const stack = CONTEXT_STACK.get(key)!;
    stack.push(value);
    const out = children;
    stack.pop();
    return out;
  }

  function useContext() {
    const stack = CONTEXT_STACK.get(key)!;
    return stack[stack.length - 1] as T;
  }

  return { Provider, useContext, key };
}
