export type DevtoolsEvent = { type: string; payload?: any; ts: number };
export type ComponentNode = { id: string; name: string; parentId?: string; props?: Record<string, any>; hookState?: any[] };

export class DevtoolsInspector {
  private events: DevtoolsEvent[] = [];
  private componentTree = new Map<string, ComponentNode>();

  track(type: string, payload?: any) { this.events.push({ type, payload, ts: Date.now() }); }
  snapshot() { return [...this.events]; }
  clear() { this.events = []; this.componentTree.clear(); }

  registerComponent(node: ComponentNode) { this.componentTree.set(node.id, node); }
  updateHookState(id: string, hooks: any[]) {
    const prev = this.componentTree.get(id);
    if (prev) this.componentTree.set(id, { ...prev, hookState: hooks });
  }
  getComponentTree() { return [...this.componentTree.values()]; }
}
