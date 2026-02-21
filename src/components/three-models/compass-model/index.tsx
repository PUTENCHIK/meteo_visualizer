import clsx from 'clsx';
import s from './compass-model.module.scss';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { BoxMesh } from '@models_/box-mesh';
import { Group, Vector3 } from 'three';
import { MeshGroup } from '@models_/mesh-group';
import { Center, Text3D } from '@react-three/drei';
import { degToRad } from 'three/src/math/MathUtils.js';
import { Loader } from '@components/loader';

interface CompassProps {
    mainCamera: any;
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
        <MeshGroup ref={compassRef} rotation={new Vector3(0, 90, 0)}>
            {/* North arrow */}
            <BoxMesh
                size={new Vector3(directionSize, directionSize, directionLength)}
                position={new Vector3(0, 0, directionLength / 2 + directionSize / 2)}
                color='blue'
            />
            <group position={[0, 0, directionLength + directionSize * 2]}>
                <Center>
                    <Text3D
                        font={'/public/roboto_regular.json'}
                        rotation={[degToRad(90), degToRad(180), 0]}
                        size={0.1}
                        height={0.05}>
                        N
                    </Text3D>
                </Center>
            </group>
            {/* South arrow */}
            <BoxMesh
                size={new Vector3(directionSize, directionSize, directionLength)}
                position={new Vector3(0, 0, -directionLength / 2 - directionSize / 2)}
                color='red'
            />
            <group position={[0, 0, -directionLength - directionSize * 2]}>
                <Center>
                    <Text3D
                        font={'/public/roboto_regular.json'}
                        rotation={[degToRad(90), degToRad(180), 0]}
                        size={0.1}
                        height={0.05}>
                        S
                    </Text3D>
                </Center>
            </group>
            {/* East arrow */}
            <BoxMesh
                size={new Vector3(directionSize, directionSize, directionLength / 3)}
                position={new Vector3(-directionLength / 6 - directionSize / 2, 0, 0)}
                rotation={new Vector3(0, 90, 0)}
                color='gray'
            />
            {/* West arrow */}
            <BoxMesh
                size={new Vector3(directionSize, directionSize, directionLength / 3)}
                position={new Vector3(directionLength / 6 + directionSize / 2, 0, 0)}
                rotation={new Vector3(0, 90, 0)}
                color='gray'
            />
        </MeshGroup>
    );
};

interface CompassModelProps {
    mainCamera: any;
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
