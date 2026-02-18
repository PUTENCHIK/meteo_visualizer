import type { Theme } from '@context/theme-context';

interface AppData {
    theme: Theme;
}

const STORAGE_KEY = 'meteo_visualizer';

class LocalStorageManager {
    private static instance: LocalStorageManager;

    private constructor() {}

    public static getInstance(): LocalStorageManager {
        if (!LocalStorageManager.instance) {
            LocalStorageManager.instance = new LocalStorageManager();
        }
        return LocalStorageManager.instance;
    }

    public exists(): boolean {
        return localStorage.getItem(STORAGE_KEY) !== null;
    }

    public getDefault(): AppData {
        return {
            theme: 'light',
        };
    }

    public getData(): AppData {
        return this.exists() ? JSON.parse(localStorage.getItem(STORAGE_KEY)!) : this.getDefault();
    }

    private saveData(newData: AppData): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    }

    public getItem<K extends keyof AppData>(key: K): AppData[K] {
        return this.getData()[key];
    }

    public setItem<K extends keyof AppData>(key: K, value: AppData[K]): void {
        const data = this.getData();
        data[key] = value;
        this.saveData(data);
    }
}

export const storageManager = LocalStorageManager.getInstance();
