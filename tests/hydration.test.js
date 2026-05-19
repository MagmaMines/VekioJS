import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToString, hydrateFromString } from '../dist/ssr/index.js';
import { FRAGMENT } from '../dist/types/index.js';

test('ssr renders basic tree', () => {
  const html = renderToString({ type: 'div', props: { children: ['ok'] } });
  assert.equal(html, '<div>ok</div>');
});

test('ssr fragment support', () => {
  const html = renderToString({ type: FRAGMENT, props: { children: ['a', { type: 'span', props: { children: ['b'] } }] } });
  assert.equal(html, 'a<span>b</span>');
});

test('hydrateFromString injects html', () => {
  const el = { innerHTML: '', childNodes: [] };
  Object.defineProperty(el, 'childNodes', { get() { return [{}, {}]; } });
  const count = hydrateFromString(el, '<p>x</p><p>y</p>');
  assert.equal(count, 2);
  assert.equal(el.innerHTML, '<p>x</p><p>y</p>');
});
