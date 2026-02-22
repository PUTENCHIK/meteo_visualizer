import { Vector3 } from 'three';
import { BoxMesh } from '@models_/box-mesh';
import { MeshGroup } from '@models_/mesh-group';
import { YardModel } from '@models_/yard-model';
import { mastModelColor } from '@shared/colors';
import { type MastHeight, type YardDataItem } from '@shared/masts-yards';
import { CylinderMesh } from '@models_/cylinder-mesh';
import { polarPosToXY, type PolarSystemPosition } from '@utils/funcs';

interface MastModelProps {
    height: MastHeight;
    position: PolarSystemPosition;
    rotation?: number;
    yards: YardDataItem[];
}

export const MastModel = ({ height, position, rotation = 0, yards }: MastModelProps) => {
    const plateHeight = 0.25;
    const plateSize = 15;
    const mastRadius = 0.3;

    return (
        <MeshGroup
            position={new Vector3(polarPosToXY(position).x, 0, polarPosToXY(position).y)}
            rotation={new Vector3(0, rotation, 0)}>
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
