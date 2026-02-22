import type { AppSettings, SettingsMap } from '@shared/settings';
import { appSettings as defaultSettings } from '@utils/consts';
import { copyObject, createSettingsProxy } from '@utils/funcs';

class SettingsManager<T extends AppSettings> {
    private static instance: SettingsManager<AppSettings> | null = null;
    private appSettings: T;
    public settings: SettingsMap<T>;

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
}

export const settingsManager = SettingsManager.getInstance();
