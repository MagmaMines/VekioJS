// File-system route helper: app/**/page.tsx -> URL path
export function pageFileToRoute(file: string) {
  return file
    .replace(/^app\//, '/')
    .replace(/\/page\.(t|j)sx?$/, '')
    .replace(/\/index$/, '/')
    .replace(/\[(.+?)\]/g, ':$1') || '/';
}
