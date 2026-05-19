import { FRAGMENT, SUSPENSE } from '../types/index.js';
import { escapeHTML, safeAttribute } from '../security/index.js';
import { beginHooks } from '../hooks/index.js';
function attrsToString(props) {
    return Object.keys(props)
        .filter(k => !['children', 'key'].includes(k) && !k.startsWith('on'))
        .map(k => ` ${k}="${safeAttribute(k, props[k])}"`)
        .join('');
}
export function renderToString(node) {
    if (node == null || node === false || node === true)
        return '';
    if (typeof node === 'string' || typeof node === 'number')
        return escapeHTML(node);
    if (typeof node.type === 'function') {
        const id = `fn:${node.type.name || 'anon'}:${node.props.key ?? '0'}`;
        beginHooks(id);
        return renderToString(node.type(node.props));
    }
    if (node.type === FRAGMENT || node.type === SUSPENSE) {
        return (node.props.children || []).map((c) => renderToString(c)).join('');
    }
    const props = node.props || {};
    const children = (props.children || []).map((c) => renderToString(c)).join('');
    return `<${String(node.type)}${attrsToString(props)}>${children}</${String(node.type)}>`;
}
export async function renderToStream(node) {
    const content = renderToString(node);
    return new ReadableStream({ start(controller) { controller.enqueue(content); controller.close(); } });
}
export function hydrateFromString(container, html) {
    container.innerHTML = html;
    return container.childNodes.length;
}
export function renderToReadableStream(node) {
    return renderToStream(node);
}
//# sourceMappingURL=index.js.map