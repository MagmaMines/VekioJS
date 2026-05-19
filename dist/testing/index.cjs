const { renderToString } = require('../ssr/index.js');;
exports.renderForTest = renderForTest;(node) {
    return { html: renderToString(node) };
}
exports.expectHTMLContains = expectHTMLContains;(html, part) {
    if (!html.includes(part))
        throw new Error(`[VekioTest] Expected HTML to include: ${part}`);
}
//# sourceMappingURL=index.js.map