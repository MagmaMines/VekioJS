import { renderToString } from '../ssr/index.js';

export function renderForTest(node: any) {
  return { html: renderToString(node) };
}

export function expectHTMLContains(html: string, part: string) {
  if (!html.includes(part)) throw new Error(`[VekioTest] Expected HTML to include: ${part}`);
}
