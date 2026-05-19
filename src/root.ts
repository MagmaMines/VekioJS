import type { VNode } from './types/index.js';
import { Vekio } from './runtime/index.js';

/** Modern root API similar to ReactDOM.createRoot */
export function createRoot(container: HTMLElement) {
  if (!container) throw new Error('[Vekio.createRoot] container is required.');
  return {
    render(node: VNode) {
      return Vekio.render(node, container, { dom: true, mode: 'whole_screen', lane: 'urgent' });
    },
    hydrate(node: VNode) {
      const html = Vekio.renderToString(node);
      return Vekio.hydrateFromString(container, html);
    }
  };
}
