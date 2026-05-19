const stylePresets = {};
const jsPresets = {};
const htmlPresets = {};
const styleCache = new Map();
for (let i = 1; i <= 1800; i++) {
    stylePresets[`preset${String(i).padStart(4, '0')}`] = {
        padding: `${0.4 + (i % 5) * 0.1}rem ${0.8 + (i % 4) * 0.2}rem`,
        borderRadius: `${4 + (i % 12)}px`,
        boxShadow: `0 ${i % 5}px ${8 + (i % 9)}px rgba(2,6,23,.08)`
    };
}
const baseOps = ['PUSH', 'FETCH', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'MAP', 'FILTER', 'REDUCE', 'FIND', 'SORT'];
baseOps.forEach((base, idx) => {
    for (let i = 1; i <= 30; i++)
        jsPresets[`${base}_${i}`] = (...args) => ({ op: base, variant: i, args, idx });
});
const htmlNames = ['LoginPanel', 'RegisterPanel', 'ForgotPasswordPanel', 'TwoFactorPanel', 'ProfilePanel', 'SettingsPanel', 'BillingPanel', 'PricingPanel', 'CheckoutPanel', 'OrderSummaryPanel', 'NavbarShell', 'SidebarShell', 'DashboardShell', 'KpiGrid', 'ActivityFeed', 'NotificationCenter', 'HelpCenter', 'FAQPanel', 'ContactPanel', 'TicketPanel', 'BlogList', 'BlogPost', 'CommentThread', 'DocsLayout', 'TableAdvanced', 'DataGrid', 'CalendarPanel', 'TimelinePanel', 'RoadmapPanel', 'KanbanBoard', 'ChatPanel', 'InboxPanel', 'EmailComposer', 'SearchPanel', 'FilterPanel', 'AnalyticsPanel', 'ReportsPanel', 'AuditPanel', 'SecurityPanel', 'TeamPanel', 'RoleManager', 'PermissionPanel', 'ApiKeysPanel', 'WebhookPanel', 'IntegrationsPanel', 'DeployPanel', 'StatusPanel', 'SlaPanel', 'IncidentPanel', 'OnboardingPanel', 'HeroSection', 'FeaturesSection', 'TestimonialsSection', 'PartnersSection', 'FooterSection', 'LandingPageShell', 'ProductCard', 'PricingCard', 'FeatureCard', 'CaseStudyCard', 'ArticleCard', 'VideoCard', 'GalleryPanel', 'MediaPanel', 'UploadPanel', 'DownloadPanel', 'StreamPanel', 'PlayerPanel', 'PodcastPanel', 'CoursePanel', 'LessonPanel', 'QuizPanel', 'CertificatePanel', 'CheckoutForm', 'ShippingForm', 'AddressForm', 'PaymentForm', 'SubscriptionPanel', 'RenewalPanel', 'CancelPanel', 'SurveyPanel', 'FormBuilder', 'WizardPanel', 'StepperPanel', 'ProgressPanel', 'EmptyStatePanel', 'ErrorStatePanel', 'SuccessStatePanel', 'MaintenancePanel', 'LegalPanel', 'TermsPanel', 'PrivacyPanel', 'CookiePanel', 'AnnouncementBar', 'PromoBanner', 'ReferralPanel', 'AffiliatePanel', 'CommunityPanel', 'ForumPanel', 'LeaderboardPanel'];
htmlNames.forEach((name, i) => {
    htmlPresets[name] = (opts = {}) => ({
        type: 'section',
        props: { preset: `preset${String((i % 1800) + 1).padStart(4, '0')}`, styleVars: { '--vekio-gap': `${8 + (i % 5) * 2}px` }, custom: { display: 'grid', gap: 'var(--vekio-gap)', ...(opts.custom || {}) }, children: opts.children || [] }
    });
});
const themeVars = {
    light: { '--vekio-bg': '#ffffff', '--vekio-fg': '#0f172a' },
    dark: { '--vekio-bg': '#0f172a', '--vekio-fg': '#e2e8f0' },
    system: { '--vekio-bg': 'Canvas', '--vekio-fg': 'CanvasText' }
};
export function compose(...presetNames) { return presetNames.filter(Boolean); }
export function resolveStylePresets(keys = [], styleVars = {}) {
    const cacheKey = JSON.stringify([keys, styleVars]);
    const hit = styleCache.get(cacheKey);
    if (hit)
        return hit;
    const merged = keys.reduce((acc, k) => Object.assign(acc, stylePresets[k] || {}), {});
    Object.keys(styleVars).forEach(k => { merged[k] = `var(${k})`; });
    styleCache.set(cacheKey, merged);
    return merged;
}
export function getThemeVars(theme = 'light') { return themeVars[theme]; }
export function getJSPreset(name) { return jsPresets[name]; }
export function getHTMLPreset(name) { return htmlPresets[name]; }
export function listPresetStats() { return { style: Object.keys(stylePresets).length, js: Object.keys(jsPresets).length, html: Object.keys(htmlPresets).length, cache: styleCache.size }; }
export function createTailwindJITLayer(classes) { return classes.filter(Boolean).join(' '); }
//# sourceMappingURL=index.js.map