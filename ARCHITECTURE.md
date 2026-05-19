# VekioJS Enterprise Architecture (4.4)

## Runtime Layers
1. **Scheduler/Renderer**: lane-prioritized task execution and keyed reconciliation ops.
2. **Runtime Facade**: public API stability (`createElement`, `render`, presets, SSR, sender pipeline).
3. **Hooks Layer**: component hook contexts, effect cleanup, transition/external store primitives.
4. **SSR/Security Layer**: escaped rendering and URL sanitization.
5. **Preset Layer**: style/js/html presets with composition + cache.

## Performance Defaults
- Cached style compilation by signature.
- Microtask batched DOM commits.
- Transition lane for lower-priority rendering.
- Sender pipeline for visibility/activity-driven loading.

## Production Behavior
- Devtools available only when `globalThis.__VEKIO_DEV__ === true`.
- Runtime throws clear invariant errors for invalid public API usage.
