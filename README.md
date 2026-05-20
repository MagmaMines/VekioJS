# VekioJS — TypeScript-First Production Framework

> Developed by **MagmaMinesTeam**  
> **Contact**: help.magmamine@gmail.com  
> **NPM**: `@MagmaMinesTeam/vekiojs`



---

<img width="2000" height="2000" alt="VekioJS Framework logo" src="https://github.com/user-attachments/assets/7a895ed7-4d74-40dc-a102-96b34175f207" />

## VekioJS 4.4.0 — Production Grade Runtime + Preset Ecosystem

TypeScript-first modular framework designed for rapid prototyping and enterprise applications.

### Production-Grade Features

**Scheduling & Performance**
- Concurrent lane-aware scheduler (urgent, normal, transition, background)
- Keyed reconciliation ops (insert/move/update/delete) for stable list renders
- Batched render commits via microtask queue
- Sender pipeline for deferred work

**APIs & Hooks**
- Suspense/lazy/memo/startTransition primitives
- Extended hook suite (useState, useEffect, useContext, useReducer, useRef)
- External store integration
- Transition hooks for state machine patterns

**Rendering**
- Server-side rendering with escaping and URL sanitization
- Hydration-safe DOM reconciliation
- Dual render modes: `whole_screen` + `screen_only`
- React-compatible JSX

**Design System**
- 1800+ style presets (CSS-in-JS)
- 360 JavaScript presets (utility functions)
- 100 HTML presets (component templates)
- Preset composition and theme variable system
- Tailwind/JIT helper integration

**Tooling**
- DevTools inspector for debugging
- Bundle budget tracking
- Performance benchmark scripts
- Type-safe TypeScript-first API

### Install

```bash
npm install @MagmaMinesTeam/vekiojs
```

### Quick Start

```typescript
import { Vekio } from '@magmaminesteam/vekiojs';

const App = () => 
  Vekio.createElement('div', { className: 'card' }, 'Hello World');

Vekio.render(Vekio.createElement(App, {}), document.getElementById('root'));
```

### Commands

```bash
npm run build          # TypeScript + CommonJS build
npm run type-check     # Type validation only
npm test              # Build + run tests
npm run bench         # Performance benchmarking
npm run budget        # Bundle size analysis
```

### Module Exports

```typescript
// Main export
import { Vekio } from '@magmaminesteam/vekiojs';

// Feature-specific imports
import * as hooks from '@magmaminesteam/vekiojs/hooks';
import * as router from '@magmaminesteam/vekiojs/router';
import * as ssr from '@magmaminesteam/vekiojs/ssr';
import * as presets from '@magmaminesteam/vekiojs/presets';
```

### Ecosystem Notes

VekioJS emphasizes fast delivery through preset-driven architecture. For teams requiring React-scale third-party ecosystem depth, evaluate framework fit per project requirements.

### License

MIT © 2026 MagmaMinesTeam
