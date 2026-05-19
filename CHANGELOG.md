# Changelog

All notable changes to VekioJS will be documented in this file.

## [4.4.0] - 2025-05-19

### Production Readiness
- **Dual module support**: Added CommonJS builds alongside ESM
- **Improved exports**: Proper `exports` field with entry points for hooks, router, ssr, presets
- **Bundle optimization**: TypeScript strict mode, source maps, declaration maps
- **Package quality**: Added repository, license, author, keywords fields
- **Engine specification**: Node.js >=16.0.0 requirement declared
- **Publication control**: `.npmignore` and `files` field for clean npm packages
- **Code quality**: ESLint configuration and TypeScript strict mode

### Added
- CommonJS build script (`build-cjs.js`)
- Proper `.gitignore` configuration
- ESLint configuration for code standards
- Source maps and declaration maps in builds
- Type checking script (`npm run type-check`)

### Fixed
- Version consistency (v4.4.0 across all files)
- Package name scope (`@MagmaMinesTeam/vekiojs`)
- Module resolution and export paths

### Improved
- TypeScript configuration with strict checks
- Build process with pre-publish validation
- Development workflow with watch mode

## [4.0.0] - 2025-04-18

### Major Features
- Concurrent lane-aware scheduler (urgent, normal, transition, background)
- Keyed reconciliation ops (insert/move/update/delete)
- Batched render commits via microtask queue
- Suspense/lazy/memo/startTransition APIs
- SSR escaping and URL sanitization
- 1800 style presets + 360 JS presets + 100 HTML presets
- Preset composition with theme variables
- Plugin system and DevTools integration

## [3.2.0]

### Initial Release
- Fiber architecture and cooperative scheduling
- Preset design system with customization
- SSR + hydration pipeline
- Multiple render engines (whole_screen, screen_only)
- Extended hook and utility APIs
