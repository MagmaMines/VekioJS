export function pageFileToRoute(file) {
    return file
        .replace(/^app\//, '/')
        .replace(/\/page\.(t|j)sx?$/, '')
        .replace(/\/index$/, '/')
        .replace(/\[(.+?)\]/g, ':$1') || '/';
}
//# sourceMappingURL=index.js.map