import { useSettings } from '@context/use-settings';
import { useWeatherStations } from '@context/weather-station-context';
import { useFrame } from '@react-three/fiber';
import { getInterpolatedValue, getMappedValue } from '@utils/funcs';
import { useMemo, useRef } from 'react';
import { InstancedMesh, Vector3, Object3D, Color, DoubleSide, Vector2 } from 'three';

interface InstancedHeatmapProps {
    basePlateSize: Vector3;
    height: number;
}

export const Heatmap = ({ basePlateSize, height }: InstancedHeatmapProps) => {
    const { map: settings } = useSettings();
    const { getStations } = useWeatherStations();

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

    const obj = useMemo(() => new Object3D(), [amount]);

    useFrame(() => {
        if (!meshRef.current || count == 0) return;

        const stations = getStations();
        const stationsList = Object.values(stations);

        let minValue = 1e6;
        let maxValue = 0;
        for (const station of stationsList) {
            minValue = Math.min(station.value, minValue);
            maxValue = Math.max(station.value, maxValue);
        }

        pixelPositions.forEach((p, i) => {
            obj.position.copy(p);
            obj.updateMatrix();
            meshRef.current.setMatrixAt(i, obj.matrix);

            // if (minValue !== maxValue) {
            const t = getInterpolatedValue(
                p,
                stationsList,
                settings.atmosphere.degreeOfInterpolation,
            );
            const tm = getMappedValue(t, minValue, maxValue, 0, 1);
            const color = new Color(1 - tm, tm, 0);
            meshRef.current.setColorAt(i, color);
            // }
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }
    });

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
            <boxGeometry args={[sizes.x, 0.1, sizes.y]} />
            <meshBasicMaterial {...materialProps} />
        </instancedMesh>
    );
};
