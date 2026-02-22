import { CompassModel } from '@models_/compass-model';
import { Scene } from '@models_/scene';
import type { Camera } from '@react-three/fiber';
import { useState } from 'react';

export const ComplexPage = () => {
    const [mainCamera, setMainCamera] = useState<Camera>();

    return (
        <>
            <Scene onCameraReady={setMainCamera} />
            <CompassModel mainCamera={mainCamera} compassType='2D' />
        </>
    );
};
