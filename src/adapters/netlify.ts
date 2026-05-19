export function createNetlifyAdapter() {
  return { name: 'netlify', deployTarget: 'edge+functions', zeroConfig: true };
}
