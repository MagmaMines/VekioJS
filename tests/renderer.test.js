import test from 'node:test';
import assert from 'node:assert/strict';
import { Renderer, Scheduler } from '../dist/renderer/index.js';

test('scheduler flushes queued render', () => {
  const s = new Scheduler();
  const r = new Renderer(s);
  let x = 0;
  r.render('screen_only', () => { x = 1; }, 'background');
  assert.equal(x, 0);
  assert.equal(s.flush(), 1);
  assert.equal(x, 1);
});

test('key reconciliation maps prior nodes', () => {
  const r = new Renderer(new Scheduler());
  const diff = r.reconcileChildrenByKey(
    [{ type: 'li', props: { key: 'a' } }, { type: 'li', props: { key: 'b' } }],
    [{ type: 'li', props: { key: 'b' } }, { type: 'li', props: { key: 'c' } }]
  );
  assert.equal(diff[0].prev?.props.key, 'b');
  assert.equal(diff[1].prev, undefined);
});
