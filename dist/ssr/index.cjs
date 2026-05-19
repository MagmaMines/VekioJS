const { FRAGMENT, SUSPENSE } = require('../types/index.js');;
const { escapeHTML, safeAttribute } = require('../security/index.js');;
const { beginHooks } = require('../hooks/index.js');;
function attrsToString(props) {
    return Object.keys(props)
        .filter(k => !['children', 'key'].includes(k) && !k.startsWith('on'))
        .map(k => ` ${k}="${safeAttribute(k, props[k])}"`)
        .join('');
}
exports.renderToString = renderToString;(node) {
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
exports.hydrateFromString = hydrateFromString;(container, html) {
    container.innerHTML = html;
    return container.childNodes.length;
}
exports.renderToReadableStream = renderToReadableStream;(node) {
    return renderToStream(node);
}
//# sourceMappingURL=index.js.map