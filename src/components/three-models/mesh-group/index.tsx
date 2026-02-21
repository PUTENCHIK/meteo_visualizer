import { forwardRef } from 'react';
import { Group, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

interface MeshGroupProps {
    children: React.ReactNode;
    position?: Vector3;
    rotation?: Vector3;
    scale?: Vector3 | number;
}

export const MeshGroup = forwardRef<Group, MeshGroupProps>(
    (
        {
            children,
            position = new Vector3(0, 0, 0),
            rotation = new Vector3(0, 0, 0),
            scale = 1,
        }: MeshGroupProps,
        ref,
    ) => {
        return (
            <group
                position={position}
                rotation={[degToRad(rotation.x), degToRad(rotation.y), degToRad(rotation.z)]}
                // rotation={rotation.toArray()}
                scale={scale}
                ref={ref}>
                {children}
            </group>
        );
    },
);
