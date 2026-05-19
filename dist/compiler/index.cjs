const { FRAGMENT } = require('../types/index.js');;
exports.compileTemplate = compileTemplate;(template) {
    return template.replace(/\s+/g, ' ').trim();
}
exports.treeShake = treeShake;(modules) {
    return Object.entries(modules).filter(([, used]) => used).map(([name]) => name);
}
exports.jsx = jsx;(type, props, key) {
    return { type, props: { ...(props || {}), key, children: props?.children || [] } };
}
exports.jsxs = jsxs;(type, props, key) {
    return jsx(type, props, key);
}
exports.jsxFragment = jsxFragment;(props) {
    return { type: FRAGMENT, props: props || {} };
}
//# sourceMappingURL=index.js.map