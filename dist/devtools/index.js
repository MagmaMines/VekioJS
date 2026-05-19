export class DevtoolsInspector {
    events = [];
    componentTree = new Map();
    track(type, payload) { this.events.push({ type, payload, ts: Date.now() }); }
    snapshot() { return [...this.events]; }
    clear() { this.events = []; this.componentTree.clear(); }
    registerComponent(node) { this.componentTree.set(node.id, node); }
    updateHookState(id, hooks) {
        const prev = this.componentTree.get(id);
        if (prev)
            this.componentTree.set(id, { ...prev, hookState: hooks });
    }
    getComponentTree() { return [...this.componentTree.values()]; }
}
//# sourceMappingURL=index.js.map