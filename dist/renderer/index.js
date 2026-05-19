export class Scheduler {
    queues = { urgent: [], normal: [], background: [], transition: [] };
    enqueue(task, lane = 'normal') { this.queues[lane].push(task); }
    flush(limit = 100) {
        let c = 0;
        const order = ['urgent', 'normal', 'transition', 'background'];
        while (c < limit) {
            const lane = order.find(l => this.queues[l].length);
            if (!lane)
                break;
            this.queues[lane].shift()?.();
            c++;
        }
        return c;
    }
}
export class Renderer {
    scheduler;
    constructor(scheduler = new Scheduler()) {
        this.scheduler = scheduler;
    }
    renderDOM(node, html, lane = 'normal') { this.scheduler.enqueue(() => { node.innerHTML = html; }, lane); return this.scheduler.flush(); }
    renderVDOM(vnode) { return vnode; }
    reconcileChildrenByKey(prev = [], next = []) {
        const oldMap = new Map(prev.map((v, i) => [String(v.props?.key ?? `idx-${i}`), { v, i }]));
        const used = new Set();
        const ops = next.map((v, index) => {
            const key = String(v.props?.key ?? `idx-${index}`);
            const old = oldMap.get(key);
            used.add(key);
            if (!old)
                return { type: 'insert', key, to: index, prev: undefined, next: v };
            if (old.i !== index)
                return { type: 'move', key, from: old.i, to: index, prev: old.v, next: v };
            return { type: 'update', key, from: old.i, to: index, prev: old.v, next: v };
        });
        oldMap.forEach((old, key) => { if (!used.has(key))
            ops.push({ type: 'delete', key, from: old.i, prev: old.v, next: undefined }); });
        return ops;
    }
    render(mode, task, lane = 'normal') { if (mode === 'screen_only')
        return this.scheduler.enqueue(task, lane); task(); }
}
//# sourceMappingURL=index.js.map