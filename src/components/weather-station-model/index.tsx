import { weatherStationModelColor } from '@types_/colors';

interface WeatherStationModelProps {
    position: [number, number, number];
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
