export function escapeHTML(value: unknown): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeURL(url: string): string {
  const value = String(url || '').trim();
  if (/^javascript:/i.test(value)) return '#';
  return value;
}

export function safeAttribute(name: string, value: unknown): string {
  if (name === 'href' || name === 'src') return escapeHTML(sanitizeURL(String(value)));
  return escapeHTML(value);
}
