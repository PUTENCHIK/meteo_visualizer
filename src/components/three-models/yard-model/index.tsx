import { type YardDataItem } from '@shared/masts-yards';
import { edgesColor, yardModelColor } from '@shared/colors';
import { WeatherStationModel } from '@models_/weather-station-model';
import { MeshGroup } from '@models_/mesh-group';
import { Vector3 } from 'three';
import { Edges } from '@react-three/drei';
import { edgesEnable, edgesScale, edgesThreshold } from '@utils/consts';

export const YardModel = ({ height, amount }: YardDataItem) => {
    const yardSize = 0.3;
    const supportSize = 0.1;

    const shortYardLength = 2;
    const longYardLength = 3;
    const longYardExtraLength = 2;
    const supportLength = 1.5;

    function getYardPartPosition(isShortPart: boolean): Vector3 {
        return new Vector3((isShortPart ? -shortYardLength : longYardLength) / 2, 0, 0);
    }

    function getSupportPosition(isShortPart: boolean): Vector3 {
        const a = Math.sqrt((supportLength * supportLength) / 2);

        return new Vector3((a / 2) * (isShortPart ? -1 : 1), -a / 2, 0);
    }

    function getWeatherStationPosition(isUpper: boolean): Vector3 {
        const a = Math.sqrt((longYardExtraLength * longYardExtraLength) / 2);

        return new Vector3(
            longYardLength + (a / 2) * (isUpper ? -1 : 1),
            (a / 2) * (isUpper ? 1 : -1),
            0,
        );
    }

    return (
        <MeshGroup position={new Vector3(0, height, 0)}>
            {/* Короткая часть реи с одной метеостанцией */}
            <mesh position={getYardPartPosition(true)}>
                <boxGeometry args={[shortYardLength, yardSize, yardSize]} />
                <meshStandardMaterial color={yardModelColor} />
                {edgesEnable && (
                    <Edges color={edgesColor} threshold={edgesThreshold} scale={edgesScale} />
                )}
            </mesh>

            {/* Подпорка короткой части */}
            <mesh position={getSupportPosition(true)} rotation={[0, 0, -Math.PI / 4]}>
                <boxGeometry args={[supportLength, supportSize, supportSize]} />
                <meshStandardMaterial color={yardModelColor} />
                {edgesEnable && (
                    <Edges color={edgesColor} threshold={edgesThreshold} scale={edgesScale} />
                )}
            </mesh>

            {/* Метеостанция на короткой части */}
            <WeatherStationModel position={new Vector3(-shortYardLength, 0, 0)} />

            {/* Если метеостанции на рее три */}
            {amount == 3 && (
                <>
                    {/* Длинная часть реи с двумя метеостанциями */}
                    <mesh position={getYardPartPosition(false)}>
                        <boxGeometry args={[longYardLength, yardSize, yardSize]} />
                        <meshStandardMaterial color={yardModelColor} />
                        {edgesEnable && (
                            <Edges
                                color={edgesColor}
                                threshold={edgesThreshold}
                                scale={edgesScale}
                            />
                        )}
                    </mesh>

                    {/* Подпорка длинной части */}
                    <mesh position={getSupportPosition(false)} rotation={[0, 0, Math.PI / 4]}>
                        <boxGeometry args={[supportLength, supportSize, supportSize]} />
                        <meshStandardMaterial color={yardModelColor} />
                        {edgesEnable && (
                            <Edges
                                color={edgesColor}
                                threshold={edgesThreshold}
                                scale={edgesScale}
                            />
                        )}
                    </mesh>

                    {/* Наклонная часть реи */}
                    <mesh position={[longYardLength, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
                        <boxGeometry args={[longYardExtraLength, yardSize, yardSize]} />
                        <meshStandardMaterial color={yardModelColor} />
                        {edgesEnable && (
                            <Edges
                                color={edgesColor}
                                threshold={edgesThreshold}
                                scale={edgesScale}
                            />
                        )}
                    </mesh>

                    {/* Верхняя метеостанция на длинной части */}
                    <WeatherStationModel position={getWeatherStationPosition(true)} />

                    {/* Нижняя метеостанция на длинной части */}
                    <WeatherStationModel position={getWeatherStationPosition(false)} />
                </>
            )}
        </MeshGroup>
    );
};
