import { type YardDataItem } from '@shared/masts-yards';
import { yardModelColor } from '@shared/colors';
import { WeatherStationModel } from '@models_/weather-station-model';
import { MeshGroup } from '@models_/mesh-group';
import { Vector3 } from 'three';
import { BoxMesh } from '@models_/box-mesh';

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
            <BoxMesh
                size={new Vector3(shortYardLength, yardSize, yardSize)}
                position={getYardPartPosition(true)}
                color={yardModelColor}
            />

            {/* Подпорка короткой части */}
            <BoxMesh
                size={new Vector3(supportLength, supportSize, supportSize)}
                position={getSupportPosition(true)}
                rotation={new Vector3(0, 0, -45)}
                color={yardModelColor}
            />

            {/* Метеостанция на короткой части */}
            <WeatherStationModel position={new Vector3(-shortYardLength, 0, 0)} />

            {/* Если метеостанции на рее три */}
            {amount == 3 && (
                <>
                    {/* Длинная часть реи с двумя метеостанциями */}
                    <BoxMesh
                        size={new Vector3(longYardLength, yardSize, yardSize)}
                        position={getYardPartPosition(false)}
                        color={yardModelColor}
                    />

                    {/* Подпорка длинной части */}
                    <BoxMesh
                        size={new Vector3(supportLength, supportSize, supportSize)}
                        position={getSupportPosition(false)}
                        rotation={new Vector3(0, 0, 45)}
                        color={yardModelColor}
                    />

                    {/* Наклонная часть реи */}
                    <BoxMesh
                        size={new Vector3(longYardExtraLength, yardSize, yardSize)}
                        position={new Vector3(longYardLength, 0, 0)}
                        rotation={new Vector3(0, 0, -45)}
                        color={yardModelColor}
                    />

                    {/* Верхняя метеостанция на длинной части */}
                    <WeatherStationModel position={getWeatherStationPosition(true)} />

                    {/* Нижняя метеостанция на длинной части */}
                    <WeatherStationModel position={getWeatherStationPosition(false)} />
                </>
            )}
        </MeshGroup>
    );
};
