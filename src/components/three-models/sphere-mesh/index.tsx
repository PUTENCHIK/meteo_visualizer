import { Vector3, type Mesh } from 'three';
import { Outlines } from '@react-three/drei';
import type { EdgesEnable } from '@shared/interfaces';
import { useSettings } from '@context/use-settings';
import { forwardRef } from 'react';

interface SphereMeshProps extends EdgesEnable {
    radius: number;
    position?: Vector3;
    segments?: number;
    color: string;
}

export const SphereMesh = forwardRef<Mesh, SphereMeshProps>(
    (
        {
            radius,
            position = new Vector3(),
            segments = 32,
            color,
            forceEdges: forceEdge,
        }: SphereMeshProps,
        ref,
    ) => {
        const { map: settings } = useSettings();

        return (
            <mesh position={position} ref={ref}>
                <sphereGeometry args={[radius, segments, segments]} />
                <meshStandardMaterial color={color} />
                {(forceEdge === 'with' ||
                    (forceEdge !== 'without' && settings.scene.edges.enable)) && (
                    <Outlines
                        color={settings.scene.edges.color}
                        thickness={settings.scene.edges.thickness}
                        scale={settings.scene.edges.scale}
                    />
                )}
            </mesh>
        );
    },
);
