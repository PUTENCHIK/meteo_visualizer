import { useSettings } from '@context/use-settings';
import { SphereMesh } from '@models_/sphere-mesh';
import { Vector3 } from 'three';

interface WeatherStationModelProps {
    position: Vector3;
}

export const WeatherStationModel = ({ position }: WeatherStationModelProps) => {
    const { map: settings } = useSettings();

    return (
        <SphereMesh
            radius={settings.model.weatherStation.radius}
            position={position}
            color={settings.model.weatherStation.color}
        />
    );
};
