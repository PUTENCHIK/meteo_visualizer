import { BoxMesh } from '@models_/box-mesh';
import { MeshGroup } from '@models_/mesh-group';
import { YardModel } from '@models_/yard-model';
import { mastModelColor } from '@shared/colors';
import { type MastHeight, type YardDataItem } from '@shared/masts-yards';
import { CylinderMesh } from '@models_/cylinder-mesh';
import { Vector2, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

interface MastModelProps {
    height: MastHeight;
    position: Vector2;
    rotation?: number;
    yards: YardDataItem[];
}

export const MastModel = ({ height, position, rotation = 0, yards }: MastModelProps) => {
    const plateHeight = 0.25;
    const plateSize = 15;
    const mastRadius = 0.3;

    return (
        <MeshGroup
            position={new Vector3(position.x, 0, position.y)}
            rotation={new Vector3(0, degToRad(rotation), 0)}>
            {/* Платформа для мачты */}
            <BoxMesh
                size={new Vector3(plateSize, plateHeight, plateSize)}
                position={new Vector3(0, plateHeight / 2, 0)}
                color={mastModelColor}
            />

            {/* Мачта */}
            <CylinderMesh
                radius={mastRadius}
                height={height}
                position={new Vector3(0, height / 2, 0)}
                color={mastModelColor}
            />

            {/* Реи с метеостанциями */}
            {yards.map((yard, index) => (
                <YardModel key={index} height={yard.height} amount={yard.amount} />
            ))}
        </MeshGroup>
    );
};
