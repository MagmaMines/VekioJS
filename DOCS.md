# VekioJS Docs (4.4)

## Core APIs
- `Vekio.createElement(type, props, ...children)`
- `Vekio.render(vnode, container, opts)`
- `Vekio.memo(component, areEqual?)`
- `Vekio.startTransition(cb)`
- `Vekio.lazy(loader)`
- `Vekio.Suspense(props)`
- `Vekio.senderPipeline(tasks)`
- `Vekio.preload(loader)`

## Hooks
- `useState`, `useReducer`
- `useMemo`, `useCallback`
- `useEffect`, `useLayoutEffect`
- `useRef`, `useImperativeHandle`
- `useDeferredValue`, `useTransition`, `useSyncExternalStore`

## Presets
- `resolveStylePresets(keys, vars)`
- `compose(...presetNames)`
- `getThemeVars('light'|'dark'|'system')`
- `getJSPreset(name)` / `getHTMLPreset(name)`

## SSR/Hydration
- `renderToString`
- `renderToStream`
- `renderToReadableStream`
- `hydrateFromString`

## Security
SSR escapes text and attributes and sanitizes URL attributes (`href`, `src`).
