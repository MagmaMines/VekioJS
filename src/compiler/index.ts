import { FRAGMENT } from '../types/index.js';

export function compileTemplate(template: string) {
  return template.replace(/\s+/g, ' ').trim();
}

export function treeShake(modules: Record<string, boolean>) {
  return Object.entries(modules).filter(([, used]) => used).map(([name]) => name);
}

export function jsx(type: any, props: any, key?: string) {
  return { type, props: { ...(props || {}), key, children: props?.children || [] } };
}

export function jsxs(type: any, props: any, key?: string) {
  return jsx(type, props, key);
}

export function jsxFragment(props: any) {
  return { type: FRAGMENT, props: props || {} };
}
