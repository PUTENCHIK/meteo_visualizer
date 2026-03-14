import { useComplexData } from '@context/complex-data-context';
import { useSettings } from '@context/use-settings';
import { SphereMesh } from '@models_/sphere-mesh';
import { useFrame } from '@react-three/fiber';
import { getSunPosition, sunPosToLocal } from '@utils/coordinate-systems';
import { useRef } from 'react';
import type { DirectionalLight, Mesh } from 'three';

export const SunModel = () => {
    const { map: settings } = useSettings();
    const { position: complexPosition } = useComplexData();

    const sunRef = useRef<Mesh>(null);
    const directionalLightRef = useRef<DirectionalLight>(null);

    useFrame(() => {
        if (!sunRef.current && !directionalLightRef.current) return;

        const { azimuth: a, elevation: e } = getSunPosition(complexPosition);
        const targetPos = sunPosToLocal(a, e, settings.model.sun.orbitalRadius);
        sunRef.current?.position.copy(targetPos);
        directionalLightRef.current?.position.copy(targetPos);
    });

    return (
        <>
            {settings.model.sun.enable && (
                <SphereMesh
                    color={settings.model.sun.color}
                    radius={settings.model.sun.size}
                    ref={sunRef}
                />
            )}
            {settings.scene.light.directional.enable && (
                <directionalLight
                    intensity={settings.scene.light.directional.intensity}
                    color={settings.scene.light.directional.color}
                    ref={directionalLightRef}
                />
            )}
        </>
    );
};
