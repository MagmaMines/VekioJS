export declare function compose(...presetNames: string[]): string[];
export declare function resolveStylePresets(keys?: string[], styleVars?: Record<string, string>): Record<string, any>;
export declare function getThemeVars(theme?: 'light' | 'dark' | 'system'): {
    '--vekio-bg': string;
    '--vekio-fg': string;
} | {
    '--vekio-bg': string;
    '--vekio-fg': string;
} | {
    '--vekio-bg': string;
    '--vekio-fg': string;
};
export declare function getJSPreset(name: string): (...args: any[]) => any;
export declare function getHTMLPreset(name: string): (opts?: Record<string, any>) => any;
export declare function listPresetStats(): {
    style: number;
    js: number;
    html: number;
    cache: number;
};
export declare function createTailwindJITLayer(classes: string[]): string;
//# sourceMappingURL=index.d.ts.map