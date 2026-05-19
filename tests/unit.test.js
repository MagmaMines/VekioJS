import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveStylePresets, listPresetStats, getJSPreset, getHTMLPreset, createTailwindJITLayer } from '../dist/presets/index.js';
import { safeAttribute } from '../dist/security/index.js';

test('preset stats are large', () => {
  const stats = listPresetStats();
  assert.ok(stats.style >= 1700);
  assert.ok(stats.js >= 300);
  assert.ok(stats.html >= 100);
});

test('security attribute sanitize', () => {
  assert.equal(safeAttribute('href', 'javascript:alert(1)'), '#');
});

test('js preset exists', () => {
  const fn = getJSPreset('FETCH_1');
  assert.equal(typeof fn, 'function');
  assert.equal(fn('/health').op, 'FETCH');
});

test('style merge works + css vars', () => {
  const style = resolveStylePresets(['preset0001', 'preset0002'], { '--brand': '#4f46e5' });
  assert.ok(style.padding);
  assert.equal(style['--brand'], 'var(--brand)');
});

test('html preset factory exists', () => {
  const panel = getHTMLPreset('LoginPanel');
  assert.equal(typeof panel, 'function');
  assert.equal(panel({ children: [] }).type, 'section');
});

test('tailwind jit layer helper', () => {
  assert.equal(createTailwindJITLayer(['px-4', 'py-2', 'bg-indigo-500']), 'px-4 py-2 bg-indigo-500');
});
