import type { Vector3 } from 'three';
import { Outlines } from '@react-three/drei';
import { edgesColor } from '@shared/colors';
import { edgesEnable, outlinesThickness } from '@utils/consts';
import type { EdgesEnable } from '@shared/interfaces';

interface SphereMeshProps extends EdgesEnable {
    radius: number;
    position: Vector3;
    segments?: number;
    color: string;
}

export const SphereMesh = ({
    radius,
    position,
    segments = 32,
    color,
    forceEdges: forceEdge,
}: SphereMeshProps) => {
    return (
        <mesh position={position}>
            <sphereGeometry args={[radius, segments, segments]} />
            <meshStandardMaterial color={color} />
            {(forceEdge === 'with' || (forceEdge !== 'without' && edgesEnable)) && (
                <Outlines thickness={outlinesThickness} color={edgesColor} />
            )}
        </mesh>
    );
};
