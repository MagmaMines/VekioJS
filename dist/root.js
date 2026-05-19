import { Vekio } from './runtime/index.js';
export function createRoot(container) {
    if (!container)
        throw new Error('[Vekio.createRoot] container is required.');
    return {
        render(node) {
            return Vekio.render(node, container, { dom: true, mode: 'whole_screen', lane: 'urgent' });
        },
        hydrate(node) {
            const html = Vekio.renderToString(node);
            return Vekio.hydrateFromString(container, html);
        }
    };
}
//# sourceMappingURL=root.js.map