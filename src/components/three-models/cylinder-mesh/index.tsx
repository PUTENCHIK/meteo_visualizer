import type { Vector3 } from 'three';
import { Edges, Outlines } from '@react-three/drei';
import { edgesColor } from '@shared/colors';
import { edgesEnable, edgesScale, edgesThreshold, outlinesThickness } from '@utils/consts';

interface CylinderMeshProps {
    radius: number;
    height: number;
    position: Vector3;
    segments?: number;
    color: string;
}

export const CylinderMesh = ({
    radius,
    height,
    position,
    segments = 32,
    color,
}: CylinderMeshProps) => {
    return (
        <mesh position={position}>
            <cylinderGeometry args={[radius, radius, height, segments]} />
            <meshStandardMaterial color={color} />
            {edgesEnable && (
                <>
                    <Edges color={edgesColor} threshold={edgesThreshold} scale={edgesScale} />
                    <Outlines thickness={outlinesThickness} color={edgesColor} />
                </>
            )}
        </mesh>
    );
};
