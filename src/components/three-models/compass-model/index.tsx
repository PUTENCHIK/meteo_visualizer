import clsx from 'clsx';
import s from './compass-model.module.scss';
import { Canvas, useFrame, type Camera } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import { BoxMesh } from '@models_/box-mesh';
import { Euler, Group, Vector3 } from 'three';
import { MeshGroup } from '@models_/mesh-group';
import { Loader } from '@components/loader';
import { TextMesh } from '@models_/text-mesh';

export type CompassType = '2D' | '3D';

interface CompassProps {
    mainCamera?: Camera;
    compassType: CompassType;
}

const Compass = ({ mainCamera, compassType }: CompassProps) => {
    const directionSize = 0.06;
    const directionLength = 0.25;

    const compassRef = useRef<Group>(null);

    const euler: Euler = useMemo(() => {
        return new Euler();
    }, []);

    useFrame(() => {
        if (!compassRef.current || !mainCamera) return;

        if (compassType === '2D') {
            euler.setFromQuaternion(mainCamera.quaternion, 'YXZ');
            compassRef.current.rotation.set(0, 0, euler.y);
        } else {
            compassRef.current.quaternion.copy(mainCamera.quaternion);
        }
        compassRef.current.quaternion.invert();
    });

    return (
        <MeshGroup ref={compassRef}>
            <MeshGroup rotation={new Vector3(compassType === '2D' ? 90 : 0, 0, 0)}>
                {/* North arrow */}
                <BoxMesh
                    size={new Vector3(directionSize, directionSize, directionLength)}
                    position={new Vector3(0, 0, directionLength / 2 + directionSize / 2)}
                    color='blue'
                    forceEdges={'without'}
                />
                <TextMesh
                    text='N'
                    position={new Vector3(0, 0, directionLength + directionSize * 2)}
                    rotation={new Vector3(90, 180, 0)}
                    size={0.1}
                    height={0.05}
                    forceEdges='without'
                />
                {/* South arrow */}
                <BoxMesh
                    size={new Vector3(directionSize, directionSize, directionLength)}
                    position={new Vector3(0, 0, -directionLength / 2 - directionSize / 2)}
                    color='red'
                    forceEdges={'without'}
                />
                <TextMesh
                    text='S'
                    position={new Vector3(0, 0, -directionLength - directionSize * 2)}
                    rotation={new Vector3(90, 180, 0)}
                    size={0.1}
                    height={0.05}
                    forceEdges='without'
                />
                {/* East arrow */}
                <BoxMesh
                    size={new Vector3(directionSize, directionSize, directionLength / 3)}
                    position={new Vector3(-directionLength / 6 - directionSize / 2, 0, 0)}
                    rotation={new Vector3(0, 90, 0)}
                    color='gray'
                    forceEdges={'without'}
                />
                {/* West arrow */}
                <BoxMesh
                    size={new Vector3(directionSize, directionSize, directionLength / 3)}
                    position={new Vector3(directionLength / 6 + directionSize / 2, 0, 0)}
                    rotation={new Vector3(0, 90, 0)}
                    color='gray'
                    forceEdges={'without'}
                />
            </MeshGroup>
        </MeshGroup>
    );
};

interface CompassModelProps {
    mainCamera?: Camera;
    compassType: CompassType;
}

export const CompassModel = ({ mainCamera, compassType }: CompassModelProps) => {
    const compassSize = 100;

    return (
        <div className={clsx(s['compass-wrapper'])}>
            <Canvas
                camera={{ position: [0, 0, 1], fov: 60 }}
                style={{ width: `${compassSize}px`, height: `${compassSize}px` }}>
                <Suspense fallback={<Loader type='circle' />}>
                    <ambientLight intensity={1.5} />
                    <Compass mainCamera={mainCamera} compassType={compassType} />
                </Suspense>
            </Canvas>
        </div>
    );
};
