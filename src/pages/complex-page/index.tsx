import { CompassModel } from '@models_/compass-model';
import { Scene } from '@models_/scene';
import type { Camera } from '@react-three/fiber';
import { useState } from 'react';
import { SettingsMenu } from '@components/settings-menu';
import { useSettings } from '@context/use-settings';

export const ComplexPage = () => {
    const [mainCamera, setMainCamera] = useState<Camera>();
    const { map: settings } = useSettings();

    return (
        <>
            <Scene onCameraReady={setMainCamera} />
            {settings.compass.enable && (
                <CompassModel mainCamera={mainCamera} compassType={settings.compass.type} />
            )}
            <SettingsMenu />
        </>
    );
};
