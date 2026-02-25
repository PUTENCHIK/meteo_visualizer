import { useSyncExternalStore } from 'react';
import { settingsManager } from '@managers/settings-manager';
import type { SettingsMap } from '@shared/settings';
import type { appSettings } from '@utils/consts';

type AppSettingsType = typeof appSettings;

export const useSettings = () => {
    useSyncExternalStore(
        (callback) => settingsManager.subscribe(callback),
        () => settingsManager.getRawSettings(),
    );

    return {
        raw: settingsManager.getRawSettings() as AppSettingsType,
        map: settingsManager.settings as SettingsMap<AppSettingsType>,
    };
};
