import { SphereMesh } from '@models_/sphere-mesh';
import { weatherStationModelColor } from '@shared/colors';
import { Vector3 } from 'three';

interface WeatherStationModelProps {
    position: Vector3;
}

export const WeatherStationModel = ({ position }: WeatherStationModelProps) => {
    const radius = 0.35;

    return <SphereMesh radius={radius} position={position} color={weatherStationModelColor} />;
};
