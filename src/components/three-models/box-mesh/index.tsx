import { Vector3 } from 'three';
import { Edges } from '@react-three/drei';
import { edgesColor } from '@shared/colors';
import { edgesEnable, edgesScale, edgesThreshold } from '@utils/consts';

interface BoxMeshProps {
    size: Vector3;
    position: Vector3;
    rotation?: Vector3;
    color: string;
}

export const BoxMesh = ({ size, position, rotation = new Vector3(), color }: BoxMeshProps) => {
    return (
        <mesh position={position} rotation={rotation.toArray()}>
            <boxGeometry args={size.toArray()} />
            <meshStandardMaterial color={color} />
            {edgesEnable && (
                <Edges color={edgesColor} threshold={edgesThreshold} scale={edgesScale} />
            )}
        </mesh>
    );
};
