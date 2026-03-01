import { useSettings } from '@context/use-settings';
import { AtmosphereParticle } from '@models_/atmosphere-particle';
import { useEffect, useMemo, useRef } from 'react';
import { Color, InstancedMesh, Object3D, Vector3 } from 'three';

interface AtmosphereModelProps {
    basePlateSize: Vector3;
    height: number;
}

export const AtmosphereModel = ({ basePlateSize, height }: AtmosphereModelProps) => {
    const { map: settings } = useSettings();

    const particleSize = settings.atmosphere.model.particles.size;
    const particleFrequency = settings.atmosphere.model.particles.frequency;
    const particleForm = settings.atmosphere.model.particles.form;
    const particleOpacity = settings.atmosphere.model.particles.opacity;

    const meshRef = useRef<InstancedMesh>(null);

    const particlePositions = useMemo(() => {
        const minParticles = 2;

        const list: Vector3[] = [];
        const count = new Vector3(
            (basePlateSize.x / particleSize) * particleFrequency,
            (height / particleSize) * particleFrequency,
            (basePlateSize.z / particleSize) * particleFrequency,
        );
        count.x = Math.max(Math.floor(count.x), minParticles);
        count.y = Math.max(Math.floor(count.y), minParticles);
        count.z = Math.max(Math.floor(count.z), minParticles);

        const delta = new Vector3(
            (basePlateSize.x - count.x * particleSize) / (count.x - 1),
            (height - count.y * particleSize) / (count.y - 1),
            (basePlateSize.z - count.z * particleSize) / (count.z - 1),
        );
        for (let x = 0; x < count.x; x += 1) {
            for (let y = 0; y < count.y; y += 1) {
                for (let z = 0; z < count.z; z += 1) {
                    list.push(
                        new Vector3(
                            -basePlateSize.x / 2 + x * (delta.x + particleSize) + particleSize / 2,
                            y * (delta.y + particleSize) + particleSize / 2,
                            -basePlateSize.z / 2 + z * (delta.z + particleSize) + particleSize / 2,
                        ),
                    );
                }
            }
        }

        return list;
    }, [basePlateSize, height, particleSize, particleFrequency]);

    const count = particlePositions.length;

    useEffect(() => {
        if (!meshRef.current || count == 0) return;

        const obj = new Object3D();
        particlePositions.forEach((p, i) => {
            obj.position.set(p.x, p.y, p.z);
            obj.scale.set(1, 1, 1);
            obj.updateMatrix();
            meshRef.current!.setMatrixAt(i, obj.matrix);

            const t = Math.random();
            const color = new Color(1 - t, t, 0);

            meshRef.current!.setColorAt(i, color);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }
        meshRef.current.computeBoundingBox();
        meshRef.current.computeBoundingSphere();
    }, [count, particlePositions]);

    if (count == 0) return null;

    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, count]}
            castShadow={false}
            receiveShadow={false}>
            <AtmosphereParticle form={particleForm} size={particleSize} opacity={particleOpacity} />
        </instancedMesh>
    );
};
