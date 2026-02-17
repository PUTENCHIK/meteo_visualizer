import { MeshGroup } from '@models_/mesh-group';
import { YardModel } from '@models_/yard-model';
import { mastModelColor } from '@types_/colors';
import { EMastHeight, YardDataItem } from '@types_/masts-yards';
import { Vector2, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

// export type YardDataList = YardDataItem[];

interface MastModelProps {
    height: EMastHeight;
    position: Vector2;
    rotation?: number;
    yards: YardDataItem[];
}

export const MastModel = (props: MastModelProps) => {
    const plateHeight = 0.5;
    const plateSize = 15;
    const mastRadius = 0.3;

    return (
        <MeshGroup
            position={new Vector3(props.position.x, 0, props.position.y)}
            rotation={new Vector3(0, degToRad(props.rotation ?? 0), 0)}>
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
