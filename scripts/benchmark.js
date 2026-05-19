import { performance } from 'node:perf_hooks';
import { listPresetStats, resolveStylePresets } from '../dist/presets/index.js';
import { Renderer, Scheduler } from '../dist/renderer/index.js';

const p0 = performance.now();
for (let i = 1; i <= 100000; i++) {
  const a = (i % 1800) + 1;
  const b = ((i + 37) % 1800) + 1;
  resolveStylePresets([`preset${String(a).padStart(4, '0')}`, `preset${String(b).padStart(4, '0')}`]);
}
const p1 = performance.now();

const scheduler = new Scheduler();
const renderer = new Renderer(scheduler);
let marker = 0;
const r0 = performance.now();
for (let i = 0; i < 50000; i++) renderer.render('screen_only', () => { marker += 1; }, 'background');
scheduler.flush(100000);
const r1 = performance.now();

console.log('Benchmark: preset resolve x100000');
console.log('Duration(ms):', Number((p1 - p0).toFixed(2)));
console.log('Benchmark: scheduler background x50000');
console.log('Duration(ms):', Number((r1 - r0).toFixed(2)), 'marker', marker);
console.log('Presets:', listPresetStats());
