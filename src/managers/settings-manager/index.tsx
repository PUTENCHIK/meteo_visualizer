import type { AppSettings, SettingsMap } from '@shared/settings';
import { appSettings as defaultSettings } from '@utils/consts';
import { copyObject, createSettingsProxy } from '@utils/funcs';

class SettingsManager<T extends AppSettings> {
    private static instance: SettingsManager<AppSettings> | null = null;
    private appSettings: T;
    public settings: SettingsMap<T>;
    private listeners: Set<() => void> = new Set();

    private constructor(appSettings: T) {
        this.appSettings = copyObject(appSettings);
        this.settings = createSettingsProxy(this.appSettings);
    }

    public static getInstance(): SettingsManager<typeof defaultSettings> {
        if (!SettingsManager.instance) {
            SettingsManager.instance = new SettingsManager(defaultSettings);
        }
        return SettingsManager.instance as SettingsManager<typeof defaultSettings>;
    }

    public getAppSettings(): T {
        return this.appSettings;
    }

    public reset(): void {
        const source = copyObject(defaultSettings);
        this.deepUpdate(this.appSettings, source);
    }

    private deepUpdate(target: any, source: any) {
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && 'items' in source[key]) {
                this.deepUpdate(target[key].items, source[key].items);
            } else if (source[key] && typeof source[key] === 'object' && 'value' in source[key]) {
                target[key].value = source[key].value;
            }
        }
    }

    public subscribe(callback: () => void): () => void {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    private notify(): void {
        this.listeners.forEach((cb) => cb());
    }

    public get(path: string): any {
        const keys = path.split('.');
        let current: any = this.appSettings;

        for (const key of keys) {
            if (current[key] !== undefined) {
                current = current[key];
                if (current && typeof current === 'object' && 'items' in current) {
                    current = current.items;
                }
            } else {
                return undefined;
            }
        }
        return current && typeof current === 'object' && 'value' in current
            ? current.value
            : current;
    }

    public set(path: string, value: any): void {
        const keys = path.split('.');
        let current: any = this.appSettings;
        let key: string;

        for (let i = 0; i < keys.length; i++) {
            key = keys[i];

            if (i === keys.length - 1) {
                if (current[key] && typeof current[key] === 'object' && 'value' in current[key]) {
                    current[key].value = value;
                } else {
                    current[key] = value;
                }
            } else {
                if (current[key]?.items) {
                    current = current[key].items;
                } else {
                    current = current[key];
                }
            }
        }

        this.notify();
    }
}

export const settingsManager = SettingsManager.getInstance();
