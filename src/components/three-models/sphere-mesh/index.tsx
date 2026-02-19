import type { Vector3 } from 'three';
import { Outlines } from '@react-three/drei';
import { edgesColor } from '@shared/colors';
import { edgesEnable, outlinesThickness } from '@utils/consts';

interface SphereMeshProps {
    radius: number;
    position: Vector3;
    segments?: number;
    color: string;
}

export const SphereMesh = ({ radius, position, segments = 32, color }: SphereMeshProps) => {
    return (
        <mesh position={position}>
            <sphereGeometry args={[radius, segments, segments]} />
            <meshStandardMaterial color={color} />
            {edgesEnable && <Outlines thickness={outlinesThickness} color={edgesColor} />}
        </mesh>
    );
};
