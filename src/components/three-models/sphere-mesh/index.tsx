import type { Vector3 } from 'three';
import { Outlines } from '@react-three/drei';
import type { EdgesEnable } from '@shared/interfaces';
import { useSettings } from '@context/use-settings';

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
    const { map: settings } = useSettings();

    return (
        <mesh position={position}>
            <sphereGeometry args={[radius, segments, segments]} />
            <meshStandardMaterial color={color} />
            {(forceEdge === 'with' || (forceEdge !== 'without' && settings.model.edges.enable)) && (
                <Outlines
                    thickness={settings.model.edges.thickness}
                    color={settings.model.colors.edgesColor}
                />
            )}
        </mesh>
    );
};
