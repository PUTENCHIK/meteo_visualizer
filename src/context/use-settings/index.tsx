import { useState, useEffect } from 'react';
import { settingsManager } from '@managers/settings-manager';
import type { SettingsMap } from '@shared/settings';
import type { appSettings } from '@utils/consts';

type AppSettingsType = typeof appSettings;

export const useSettings = () => {
    const [_, setTick] = useState(0);

    useEffect(() => {
        const unsubscribe = settingsManager.subscribe(() => {
            setTick((t) => t + 1);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return {
        raw: settingsManager.getAppSettings() as AppSettingsType,
        map: settingsManager.settings as SettingsMap<AppSettingsType>,
    };
};
