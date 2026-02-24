import { Vector3 } from 'three';
import { BoxMesh } from '@models_/box-mesh';
import { MeshGroup } from '@models_/mesh-group';
import { YardModel } from '@models_/yard-model';
import { type MastHeight, type YardDataItem } from '@shared/masts-yards';
import { CylinderMesh } from '@models_/cylinder-mesh';
import { polarPosToXY } from '@utils/funcs';
import type { PolarSystemPosition } from '@shared/interfaces';
import { useSettings } from '@context/use-settings';

interface MastModelProps {
    height: MastHeight;
    position: PolarSystemPosition;
    rotation?: number;
    yards: YardDataItem[];
}

export const MastModel = ({ height, position, rotation = 0, yards }: MastModelProps) => {
    const { map: settings } = useSettings();

    return (
        <MeshGroup
            position={new Vector3(polarPosToXY(position).x, 0, polarPosToXY(position).y)}
            rotation={new Vector3(0, rotation, 0)}>
            {/* Платформа для мачты */}
            {settings.model.masts.plates.enable && (
                <BoxMesh
                    size={
                        new Vector3(
                            settings.model.masts.plates.size,
                            settings.model.masts.plates.height,
                            settings.model.masts.plates.size,
                        )
                    }
                    position={new Vector3(0, settings.model.masts.plates.height / 2, 0)}
                    color={settings.model.colors.mastModelColor}
                />
            )}

            {/* Мачта */}
            <CylinderMesh
                radius={settings.model.masts.radius}
                height={height}
                position={new Vector3(0, height / 2, 0)}
                color={settings.model.colors.mastModelColor}
            />

            {/* Реи с метеостанциями */}
            {yards.map((yard, index) => (
                <YardModel key={index} height={yard.height} amount={yard.amount} />
            ))}
        </MeshGroup>
    );
};
