import { YardDataItem } from '@types_/masts-yards';
import { yardModelColor } from '@types_/colors';
import { WeatherStationModel } from '@components/weather-station-model';
import { MeshGroup } from '@components/mesh-group';

export const YardModel = (props: YardDataItem) => {
    const yardSize = 0.3;
    const supportSize = 0.1;

    const shortYardLength = 2;
    const longYardLength = 3;
    const longYardExtraLength = 2;
    const supportLength = 1.5;

    function getYardPartPosition(
        isShortPart: boolean
    ): [number, number, number] {
        return [(isShortPart ? -shortYardLength : longYardLength) / 2, 0, 0];
    }

    function getSupportPosition(
        isShortPart: boolean
    ): [number, number, number] {
        const a = Math.sqrt((supportLength * supportLength) / 2);

        return [(a / 2) * (isShortPart ? -1 : 1), -a / 2, 0];
    }

    function getWeatherStationPosition(
        isUpper: boolean
    ): [number, number, number] {
        const a = Math.sqrt((longYardExtraLength * longYardExtraLength) / 2);

        return [
            longYardLength + (a / 2) * (isUpper ? -1 : 1),
            (a / 2) * (isUpper ? 1 : -1),
            0,
        ];
    }

    return (
        <MeshGroup position={[0, props.height, 0]}>
            {/* Короткая часть реи с одной метеостанцией */}
            <mesh position={getYardPartPosition(true)}>
                <boxGeometry args={[shortYardLength, yardSize, yardSize]} />
                <meshStandardMaterial color={yardModelColor} />
            </mesh>

            {/* Подпорка короткой части */}
            <mesh
                position={getSupportPosition(true)}
                rotation={[0, 0, -Math.PI / 4]}>
                <boxGeometry args={[supportLength, supportSize, supportSize]} />
                <meshStandardMaterial color={yardModelColor} />
            </mesh>

            {/* Метеостанция на короткой части */}
            <WeatherStationModel position={[-shortYardLength, 0, 0]} />

            {/* Если метеостанции на рее три */}
            {props.amount == 3 && (
                <>
                    {/* Длинная часть реи с двумя метеостанциями */}
                    <mesh position={getYardPartPosition(false)}>
                        <boxGeometry
                            args={[longYardLength, yardSize, yardSize]}
                        />
                        <meshStandardMaterial color={yardModelColor} />
                    </mesh>

                    {/* Подпорка длинной части */}
                    <mesh
                        position={getSupportPosition(false)}
                        rotation={[0, 0, Math.PI / 4]}>
                        <boxGeometry
                            args={[supportLength, supportSize, supportSize]}
                        />
                        <meshStandardMaterial color={yardModelColor} />
                    </mesh>

                    {/* Наклонная часть реи */}
                    <mesh
                        position={[longYardLength, 0, 0]}
                        rotation={[0, 0, -Math.PI / 4]}>
                        <boxGeometry
                            args={[longYardExtraLength, yardSize, yardSize]}
                        />
                        <meshStandardMaterial color={yardModelColor} />
                    </mesh>

                    {/* Верхняя метеостанция на длинной части */}
                    <WeatherStationModel
                        position={getWeatherStationPosition(true)}
                    />

                    {/* Нижняя метеостанция на длинной части */}
                    <WeatherStationModel
                        position={getWeatherStationPosition(false)}
                    />
                </>
            )}
        </MeshGroup>
    );
};
