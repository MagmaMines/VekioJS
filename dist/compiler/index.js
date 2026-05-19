import { FRAGMENT } from '../types/index.js';
export function compileTemplate(template) {
    return template.replace(/\s+/g, ' ').trim();
}
export function treeShake(modules) {
    return Object.entries(modules).filter(([, used]) => used).map(([name]) => name);
}
export function jsx(type, props, key) {
    return { type, props: { ...(props || {}), key, children: props?.children || [] } };
}
export function jsxs(type, props, key) {
    return jsx(type, props, key);
}
export function jsxFragment(props) {
    return { type: FRAGMENT, props: props || {} };
}
//# sourceMappingURL=index.js.map