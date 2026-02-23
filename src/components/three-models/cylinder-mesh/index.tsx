import type { Vector3 } from 'three';
import { Edges, Outlines } from '@react-three/drei';
import type { EdgesEnable } from '@shared/interfaces';
import { useSettings } from '@context/use-settings';

interface CylinderMeshProps extends EdgesEnable {
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
    forceEdges: forceEdge,
}: CylinderMeshProps) => {
    const { map: settings } = useSettings();

    return (
        <mesh position={position}>
            <cylinderGeometry args={[radius, radius, height, segments]} />
            <meshStandardMaterial color={color} />
            {(forceEdge === 'with' || (forceEdge !== 'without' && settings.model.edges.enable)) && (
                <>
                    <Edges
                        color={settings.model.colors.edgesColor}
                        threshold={settings.model.edges.threshold}
                        scale={settings.model.edges.scale}
                    />
                    <Outlines
                        thickness={settings.model.edges.thickness}
                        color={settings.model.colors.edgesColor}
                    />
                </>
            )}
        </mesh>
    );
};
