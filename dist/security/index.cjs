exports.escapeHTML = escapeHTML;(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
exports.sanitizeURL = sanitizeURL;(url) {
    const value = String(url || '').trim();
    if (/^javascript:/i.test(value))
        return '#';
    return value;
}
exports.safeAttribute = safeAttribute;(name, value) {
    if (name === 'href' || name === 'src')
        return escapeHTML(sanitizeURL(String(value)));
    return escapeHTML(value);
}
//# sourceMappingURL=index.js.map