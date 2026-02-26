import { storageManager } from '@managers/local-storage-manager';
import type { AppSettings, SettingsMap } from '@shared/settings';
import { appSettings } from '@utils/consts';
import { copyObject, createSettingsProxy } from '@utils/funcs';

interface ListenerParams {
    saveSettings: boolean;
}

export class SettingsManager<T extends AppSettings> {
    private static instance: SettingsManager<AppSettings> | null = null;
    private rawSettings: T;
    public settings: SettingsMap<T>;
    private listeners: Set<(params?: Partial<ListenerParams>) => void> = new Set();

    private constructor(appSettings: T) {
        const defaultSettings = copyObject(appSettings);
        const savedSettings = storageManager.getItem('settings');
        this.deepUpdate(defaultSettings, savedSettings);
        this.rawSettings = defaultSettings;
        this.settings = createSettingsProxy(this.rawSettings);

        this.subscribe((params?: Partial<ListenerParams>) => {
            if (params?.saveSettings) {
                storageManager.setItem('settings', this.rawSettings);
            }
        });
    }

    public static getInstance(): SettingsManager<typeof appSettings> {
        if (!SettingsManager.instance) {
            SettingsManager.instance = new SettingsManager(appSettings);
        }
        return SettingsManager.instance as SettingsManager<typeof appSettings>;
    }

    public getRawSettings(): T {
        return this.rawSettings;
    }

    public reset(): void {
        const source = copyObject(appSettings);
        this.deepUpdate(this.rawSettings, source);
    }

    private deepUpdate(target: any, source: any) {
        for (const key in source) {
            if (
                source[key] &&
                typeof source[key] === 'object' &&
                'items' in source[key] &&
                target[key] &&
                typeof target[key] === 'object' &&
                'items' in target[key]
            ) {
                this.deepUpdate(target[key].items, source[key].items);
            } else if (
                source[key] &&
                typeof source[key] === 'object' &&
                'value' in source[key] &&
                target[key] &&
                typeof target[key] === 'object' &&
                'value' in target[key]
            ) {
                target[key].value = source[key].value;
            }
        }
    }

    public subscribe(callback: () => void): () => void {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    private notify(saveSettings: boolean): void {
        // Обновление ссылки на настройки для того, чтобы React увидел изменения
        this.rawSettings = { ...this.rawSettings };
        this.listeners.forEach((listener) => listener({ saveSettings: saveSettings }));
    }

    public get(path: string): any {
        const keys = path.split('.');
        let current: any = this.rawSettings;

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

    public set(path: string, value: any, finalValue?: boolean): void {
        const keys = path.split('.');
        let current: any = this.rawSettings;
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

        this.notify(finalValue ?? true);
    }
}

export const settingsManager = SettingsManager.getInstance();
