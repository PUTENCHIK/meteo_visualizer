import { Vector3 } from 'three';

interface MeshGroupProps {
    children: React.ReactNode;
    position: Vector3;
    rotation?: Vector3;
    scale?: Vector3 | number;
}

export const MeshGroup = ({
    children,
    position,
    rotation = new Vector3(0, 0, 0),
    scale = 1,
}: MeshGroupProps) => {
    return (
        <group position={position} rotation={rotation?.toArray()} scale={scale}>
            {children}
        </group>
    );
};
