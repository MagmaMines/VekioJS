import type { VNode, RenderMode, FiberLane } from '../types/index.js';

export class Scheduler {
  private queues: Record<FiberLane, (() => void)[]> = { urgent: [], normal: [], background: [], transition: [] };
  enqueue(task: () => void, lane: FiberLane = 'normal') { this.queues[lane].push(task); }
  flush(limit = 100) {
    let c = 0;
    const order: FiberLane[] = ['urgent', 'normal', 'transition', 'background'];
    while (c < limit) {
      const lane = order.find(l => this.queues[l].length);
      if (!lane) break;
      this.queues[lane].shift()?.();
      c++;
    }
    return c;
  }
}

export class Renderer {
  constructor(private scheduler = new Scheduler()) {}
  renderDOM(node: HTMLElement, html: string, lane: FiberLane = 'normal') { this.scheduler.enqueue(() => { node.innerHTML = html; }, lane); return this.scheduler.flush(); }
  renderVDOM(vnode: VNode){ return vnode; }
  reconcileChildrenByKey(prev: VNode[] = [], next: VNode[] = []) {
    const oldMap = new Map(prev.map((v,i) => [String(v.props?.key ?? `idx-${i}`), {v,i}]));
    const used = new Set<string>();
    const ops = next.map((v, index) => {
      const key = String(v.props?.key ?? `idx-${index}`);
      const old = oldMap.get(key);
      used.add(key);
      if (!old) return { type: 'insert', key, to: index, prev: undefined, next: v };
      if (old.i !== index) return { type: 'move', key, from: old.i, to: index, prev: old.v, next: v };
      return { type: 'update', key, from: old.i, to: index, prev: old.v, next: v };
    });
    oldMap.forEach((old, key)=>{ if(!used.has(key)) ops.push({type:'delete', key, from:old.i, prev:old.v, next:undefined} as any); });
    return ops;
  }
  render(mode: RenderMode, task: () => void, lane: FiberLane = 'normal') { if (mode === 'screen_only') return this.scheduler.enqueue(task, lane); task(); }
}
