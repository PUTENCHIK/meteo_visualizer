import { useState, useEffect } from 'react';
import { settingsManager } from '@managers/settings-manager';

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
        raw: settingsManager.getAppSettings(),
        map: settingsManager.settings,
    };
};
