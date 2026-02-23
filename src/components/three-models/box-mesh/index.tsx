import { Mesh, Vector3 } from 'three';
import { Edges } from '@react-three/drei';
import { forwardRef } from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';
import type { EdgesEnable } from '@shared/interfaces';
import { useSettings } from '@context/use-settings';

interface BoxMeshProps extends EdgesEnable {
    size: Vector3;
    position?: Vector3;
    rotation?: Vector3;
    color: string;
}

export const BoxMesh = forwardRef<Mesh, BoxMeshProps>(
    (
        {
            size,
            position = new Vector3(),
            rotation = new Vector3(),
            color,
            forceEdges: forceEdge,
        }: BoxMeshProps,
        ref,
    ) => {
        const { map: settings } = useSettings();

        return (
            <mesh
                position={position}
                rotation={[degToRad(rotation.x), degToRad(rotation.y), degToRad(rotation.z)]}
                ref={ref}>
                <boxGeometry args={size.toArray()} />
                <meshStandardMaterial color={color} />
                {(forceEdge === 'with' ||
                    (forceEdge !== 'without' && settings.model.edges.enable)) && (
                    <Edges
                        color={settings.model.colors.edgesColor}
                        threshold={settings.model.edges.threshold}
                        scale={settings.model.edges.scale}
                    />
                )}
            </mesh>
        );
    },
);
