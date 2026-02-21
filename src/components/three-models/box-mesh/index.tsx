import { Mesh, Vector3 } from 'three';
import { Edges } from '@react-three/drei';
import { edgesColor } from '@shared/colors';
import { edgesEnable, edgesScale, edgesThreshold } from '@utils/consts';
import { forwardRef } from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';
import type { EdgesEnable } from '@shared/interfaces';

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
        return (
            <mesh
                position={position}
                rotation={[degToRad(rotation.x), degToRad(rotation.y), degToRad(rotation.z)]}
                ref={ref}>
                <boxGeometry args={size.toArray()} />
                <meshStandardMaterial color={color} />
                {(forceEdge === 'with' || (forceEdge !== 'without' && edgesEnable)) && (
                    <Edges color={edgesColor} threshold={edgesThreshold} scale={edgesScale} />
                )}
            </mesh>
        );
    },
);
