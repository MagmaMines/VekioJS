import test from 'node:test';
import assert from 'node:assert/strict';
import { createRoot } from '../dist/root.js';
import { pageFileToRoute } from '../dist/router-fs/index.js';
import { createStore } from '../dist/store/index.js';
import { renderForTest, expectHTMLContains } from '../dist/testing/index.js';

test('createRoot renders', async () => {
  const el = { innerHTML: '', childNodes: [] };
  const root = createRoot(el);
  root.render({ type: 'div', props: { children: ['ok'] } });
  await new Promise(r => setTimeout(r, 0));
  assert.match(el.innerHTML, /ok/);
});

test('fs router mapping', () => {
  assert.equal(pageFileToRoute('app/dashboard/page.tsx'), '/dashboard');
  assert.equal(pageFileToRoute('app/blog/[slug]/page.tsx'), '/blog/:slug');
});

test('store updates', () => {
  const store = createStore({ count: 0 });
  store.setState({ count: 2 });
  assert.equal(store.getState().count, 2);
});

test('testing utils', () => {
  const r = renderForTest({ type: 'p', props: { children: ['hello'] } });
  expectHTMLContains(r.html, 'hello');
  assert.ok(true);
});
