import { useSettings } from '@context/use-settings';
import { useEffect, useMemo, useRef } from 'react';
import { InstancedMesh, Vector3, Object3D, Color, DoubleSide, Vector2 } from 'three';

interface InstancedHeatmapProps {
    basePlateSize: Vector3;
    height: number;
}

export const Heatmap = ({ basePlateSize, height }: InstancedHeatmapProps) => {
    const { map: settings } = useSettings();

    const meshRef = useRef<InstancedMesh>(null!);
    const opacity = settings.atmosphere.model.heatmaps.opacity;
    const amount = settings.atmosphere.model.heatmaps.pixelAmount;

    const sizes: Vector2 = useMemo(() => {
        return new Vector2(basePlateSize.x / amount, basePlateSize.z / amount);
    }, [basePlateSize.x, basePlateSize.z, amount]);

    const pixelPositions = useMemo(() => {
        const list: Vector3[] = [];

        for (let i = 0; i < amount; i++) {
            for (let j = 0; j < amount; j++) {
                list.push(
                    new Vector3(
                        -basePlateSize.x / 2 + (i + 0.5) * sizes.x,
                        0,
                        -basePlateSize.z / 2 + (j + 0.5) * sizes.y,
                    ),
                );
            }
        }
        return list;
    }, [basePlateSize, amount, sizes.x, sizes.y]);

    const count = pixelPositions.length;

    useEffect(() => {
        if (!meshRef.current || count == 0) return;

        const obj = new Object3D();

        pixelPositions.forEach((pos, i) => {
            obj.position.copy(pos);
            obj.updateMatrix();
            meshRef.current.setMatrixAt(i, obj.matrix);

            const t = Math.random();
            const color = new Color(1 - t, t, 0);
            meshRef.current.setColorAt(i, color);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }
    }, [count, pixelPositions]);

    const materialProps = useMemo(
        () => ({
            transparent: true,
            opacity: opacity,
            depthWrite: false,
            side: DoubleSide,
        }),
        [opacity],
    );

    if (count == 0) return null;

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, height, 0]}>
            <boxGeometry args={[sizes.x, sizes.x / 100, sizes.y]} />
            <meshBasicMaterial {...materialProps} />
        </instancedMesh>
    );
};
