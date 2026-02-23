import { useSettings } from '@context/use-settings';
import { SphereMesh } from '@models_/sphere-mesh';
import { Vector3 } from 'three';

interface WeatherStationModelProps {
    position: Vector3;
}

export const WeatherStationModel = ({ position }: WeatherStationModelProps) => {
    const radius = 0.35;

    const { map: settings } = useSettings();

    return (
        <SphereMesh
            radius={radius}
            position={position}
            color={settings.model.colors.weatherStationModelColor}
        />
    );
};
