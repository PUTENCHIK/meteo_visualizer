import clsx from 'clsx';
import s from './compass-model.module.scss';
import { Canvas, useFrame, type Camera } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { BoxMesh } from '@models_/box-mesh';
import { Group, Vector3 } from 'three';
import { MeshGroup } from '@models_/mesh-group';
import { Loader } from '@components/loader';
import { TextMesh } from '@models_/text-mesh';

interface CompassProps {
    mainCamera?: Camera;
}

const Compass = ({ mainCamera }: CompassProps) => {
    const directionSize = 0.06;
    const directionLength = 0.25;

    const compassRef = useRef<Group>(null);

    useFrame(() => {
        if (!compassRef.current || !mainCamera) return;

        compassRef.current.quaternion.copy(mainCamera.quaternion);
        compassRef.current.quaternion.invert();
    });

    return (
        <MeshGroup ref={compassRef}>
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
    );
};

interface CompassModelProps {
    mainCamera?: Camera;
}

export const CompassModel = ({ mainCamera }: CompassModelProps) => {
    const compassSize = 100;

    return (
        <div className={clsx(s['compass-wrapper'])}>
            <Canvas
                camera={{ position: [0, 0, 1], fov: 60 }}
                style={{ width: `${compassSize}px`, height: `${compassSize}px` }}>
                <Suspense fallback={<Loader type='circle' />}>
                    <ambientLight intensity={1.5} />
                    <Compass mainCamera={mainCamera} />
                </Suspense>
            </Canvas>
        </div>
    );
};
