import { MeshGroup } from '@components/mesh-group';
import { YardModel } from '@components/yard-model';
import { mastModelColor } from '@types_/colors';
import { EMastHeight, YardDataItem } from '@types_/masts-yards';
import { degToRad } from 'three/src/math/MathUtils';

export type YardDataList = YardDataItem[];

interface MastModelProps {
    height: EMastHeight;
    position: [number, number];
    rotation?: number;
    yards: YardDataList;
}

export const MastModel = (props: MastModelProps) => {
    const plateHeight = 0.5;
    const plateSize = 15;
    const mastRadius = 0.3;

    return (
        <MeshGroup
            position={[props.position[0], 0, props.position[1]]}
            rotation={[0, degToRad(props.rotation ?? 0), 0]}>
            {/* Платформа для мачты */}
            <mesh position={[0, plateHeight / 2, 0]}>
                <boxGeometry args={[plateSize, plateHeight, plateSize]} />
                <meshStandardMaterial color={mastModelColor} />
            </mesh>

            {/* Мачта */}
            <mesh position={[0, props.height / 2, 0]}>
                <cylinderGeometry
                    args={[mastRadius, mastRadius, props.height, 32]}
                />
                <meshStandardMaterial color={mastModelColor} />
            </mesh>

            {/* Реи с метеостанциями */}
            {props.yards.map((yard, index) => (
                <YardModel
                    key={index}
                    height={yard.height}
                    amount={yard.amount}
                />
            ))}
        </MeshGroup>
    );
};
