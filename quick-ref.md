# Quick Reference

## Fragment + keys
```ts
const list = Vekio.createElement('ul', {},
  items.map(i => Vekio.createElement('li', { key: i.id }, i.label))
);
```

## Sender pipeline
```ts
Vekio.senderPipeline([{ id: 'lazy-1', lane: 'background', watch: () => inView, run: loadChunk }]);
```

## Tailwind/JIT helper
```ts
const cls = Vekio.createTailwindJITLayer(['grid', 'gap-4', 'md:grid-cols-3']);
```

## HTML preset
```ts
const Login = Vekio.getHTMLPreset('LoginPanel');
const vnode = Login({ children: [Vekio.createElement('h1', {}, 'Sign in')] });
```
