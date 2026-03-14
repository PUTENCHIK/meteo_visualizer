import { Vector3 } from 'three';
import { BoxMesh } from '@models_/box-mesh';
import { MeshGroup } from '@models_/mesh-group';
import { YardModel } from '@models_/yard-model';
import { CylinderMesh } from '@models_/cylinder-mesh';
import { useSettings } from '@context/use-settings';
import { getMastConfig, type MastConfigName } from '@utils/complexes';
import { type PolarSystemPosition, polarToLocal } from '@utils/coordinate-systems';

interface MastModelProps {
    position: PolarSystemPosition;
    rotation?: number;
    configName: MastConfigName;
}

export const MastModel = ({ position, rotation = 0, configName }: MastModelProps) => {
    const { map: settings } = useSettings();

    const config = getMastConfig(configName);

    return (
        <MeshGroup
            position={new Vector3(polarToLocal(position).x, 0, polarToLocal(position).y)}
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
                    color={settings.model.masts.plates.color}
                />
            )}

            {/* Мачта */}
            <CylinderMesh
                radius={settings.model.masts.radius}
                height={config.height}
                position={new Vector3(0, config.height / 2, 0)}
                color={settings.model.masts.mastsColor}
            />

            {/* Реи с метеостанциями */}
            {config.yards.map((yard, index) => (
                <YardModel key={index} height={yard.height} amount={yard.amount} />
            ))}
        </MeshGroup>
    );
};
