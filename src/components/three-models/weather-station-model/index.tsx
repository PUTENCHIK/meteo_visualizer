import { weatherStationModelColor } from '@types_/colors';
import { Vector3 } from 'three';

interface WeatherStationModelProps {
    position: Vector3;
}

export const WeatherStationModel = (props: WeatherStationModelProps) => {
    const radius = 0.35;
    const segments = 32;

    return (
        <mesh position={props.position}>
            <sphereGeometry args={[radius, segments, segments]} />
            <meshStandardMaterial color={weatherStationModelColor} />
        </mesh>
    );
};
