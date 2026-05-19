import { renderToString } from '../ssr/index.js';
export function renderForTest(node) {
    return { html: renderToString(node) };
}
export function expectHTMLContains(html, part) {
    if (!html.includes(part))
        throw new Error(`[VekioTest] Expected HTML to include: ${part}`);
}
//# sourceMappingURL=index.js.map