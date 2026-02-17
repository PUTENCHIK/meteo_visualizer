import { useEffect, useMemo, useRef } from 'react';
import { Color, InstancedMesh, Object3D, Vector3 } from 'three';

interface AtmosphereModelProps {
    basePlateSize: Vector3;
    height: number;
}

export const AtmosphereModel = (props: AtmosphereModelProps) => {
    const particleGap = 5;
    const particleSize = 2;
    const particleSegments = 8;
    const particleOpacity = 0.3;

    const meshRef = useRef<InstancedMesh>(null);

    const particlePositions = useMemo(() => {
        let list: Vector3[] = [];
        for (
            let x = -props.basePlateSize.x / 2;
            x <= props.basePlateSize.x / 2;
            x += particleGap
        ) {
            for (
                let y = particleSize / 2;
                y <= props.height;
                y += particleGap
            ) {
                for (
                    let z = -props.basePlateSize.z / 2;
                    z <= props.basePlateSize.z / 2;
                    z += particleGap
                ) {
                    list.push(new Vector3(x, y, z));
                }
            }
        }
        return list;
    }, [props.basePlateSize, props.height]);

    const count = particlePositions.length;
    
    useEffect(() => {
        if (!meshRef.current || count == 0) return;
        
        const obj = new Object3D();
        particlePositions.forEach((p, i) => {
            obj.position.set(p.x, p.y, p.z);
            obj.scale.set(1, 1, 1);
            obj.updateMatrix();
            meshRef.current!.setMatrixAt(i, obj.matrix);
            
            const t = Math.random()
            const color = new Color(1 - t, t, 0);
            
            meshRef.current!.setColorAt(i, color);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }
    }, [count, particlePositions, meshRef.current]);
    
    const materialProps = useMemo(() => (
        {
            // color: 'red',
            transparent: true,
            opacity: particleOpacity,
            depthWrite: false,
        }
    ), [particleOpacity]);

    if (count == 0) return null;
    
    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}
                castShadow={false} receiveShadow={false}>
            {/* <boxGeometry args={[particleSize, particleSize, particleSize]} /> */}
            <sphereGeometry args={[particleSize/2, particleSegments, particleSegments]}/>
            <meshBasicMaterial {...materialProps} />
        </instancedMesh>
    );
};
