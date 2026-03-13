import { useComplexData } from '@context/complex-data-context';
import { useSettings } from '@context/use-settings';
import { SphereMesh } from '@models_/sphere-mesh';
import { useFrame } from '@react-three/fiber';
import { coordsToNumber, getSunPosition, sunPosToXYZ } from '@utils/funcs';
import { useRef } from 'react';
import type { Mesh } from 'three';

export const SunModel = () => {
    const { map: settings } = useSettings();
    const { position: complexPosition } = useComplexData();

    const sunRef = useRef<Mesh>(null);

    useFrame(() => {
        if (!sunRef.current) return;

        const { azimuth: a, elevation: e } = getSunPosition(
            coordsToNumber(complexPosition.lat),
            coordsToNumber(complexPosition.lon),
        );
        const targetPos = sunPosToXYZ(a, e, settings.model.sun.orbitalRadius);
        sunRef.current.position.copy(targetPos);
    });

    return (
        <SphereMesh
            color={settings.model.sun.color}
            radius={settings.model.sun.size}
            ref={sunRef}
        />
    );
};
