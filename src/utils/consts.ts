import type React from 'react';
import { type CompassType } from '@models_/compass-model';
import { type MastsDataItem } from '@shared/masts-yards';
import type { AppSettings } from '@shared/settings';
import type { IconName, IconSize } from '@shared/icons';
import building from '@assets/building.svg?react';
import compass from '@assets/compass.svg?react';
import telescope from '@assets/telescope.svg?react';
import wind from '@assets/wind.svg?react';
import camera from '@assets/camera.svg?react';
import {
    createBoolean,
    createChapter,
    createColor,
    createRange,
    createSection,
    createSelect,
} from './funcs';

export const masts: MastsDataItem[] = [
    {
        description: 'Северо-западная мачта',
        height: 50,
        position: { radius: 230, angle: 45 },
        yards: [
            {
                amount: 1,
                height: 2,
            },
            {
                amount: 1,
                height: 4,
            },
            {
                amount: 3,
                height: 10,
            },
            {
                amount: 3,
                height: 35,
            },
            {
                amount: 3,
                height: 50,
            },
        ],
    },
    {
        description: 'Северная мачта',
        height: 35,
        position: { radius: 100, angle: 0 },
        yards: [
            {
                amount: 1,
                height: 2,
            },
            {
                amount: 1,
                height: 4,
            },
            {
                amount: 3,
                height: 10,
            },
            {
                amount: 3,
                height: 35,
            },
        ],
    },
    {
        description: 'Восточная мачта',
        height: 35,
        position: { radius: 60, angle: 270 },
        yards: [
            {
                amount: 1,
                height: 2,
            },
            {
                amount: 1,
                height: 4,
            },
            {
                amount: 1,
                height: 10,
            },
            {
                amount: 1,
                height: 35,
            },
        ],
    },
    {
        description: 'Южная мачта',
        height: 35,
        position: { radius: 30, angle: 180 },
        yards: [
            {
                amount: 1,
                height: 2,
            },
            {
                amount: 1,
                height: 4,
            },
            {
                amount: 1,
                height: 10,
            },
            {
                amount: 1,
                height: 35,
            },
        ],
    },
];

const rawSettings = {
    model: createSection('Настройки модели комплекса', 'building', {
        telescopeModelEnable: createBoolean('Отображение КСТ-3', true),
        masts: createChapter('Мачты', {
            radius: createRange('Радиус', 0.3, 0.2, 0.5, 0.05),
            plates: createChapter('Основания мачт', {
                enable: createBoolean('Отображение', true),
                size: createRange('Размер', 15, 5, 30, 1),
                height: createRange('Высота', 0.25, 0.1, 1, 0.05),
            }),
        }),
        edges: createChapter('Границы', {
            enable: createBoolean('Отображение', true),
            threshold: createRange('Угол появления границ', 15, 1, 180, 1),
            scale: createRange('Вынос границ', 1, 0.8, 1.2, 0.01),
            thickness: createRange('Толщина границ', 1, 0.5, 5, 0.5),
        }),
        colors: createChapter('Цвета моделей', {
            basePlateColor: createColor('Цвет базовой плиты', 'rgba(116, 116, 116, 1)'),
            telescopeModelColor: createColor('Цвет модели телескопа', 'rgba(104, 104, 104, 1)'),
            mastModelColor: createColor('Цвет мачт', 'rgba(104, 104, 104, 1)'),
            yardModelColor: createColor('Цвет мачтовых рей', 'rgba(104, 104, 104, 1)'),
            weatherStationModelColor: createColor('Цвет метеостанций', 'rgba(87, 104, 201, 1)'),
            edgesColor: createColor('Цвет границ объектов', 'rgba(0, 0, 0, 1)'),
        }),
    }),
    atmosphere: createSection('Настройки модели атмосферы', 'wind', {
        enable: createBoolean('Отображение', true),
        height: createRange('Высота', 60, 20, 300, 5),
    }),
    compass: createSection('Настройки компаса', 'compass', {
        enable: createBoolean('Отображение', true),
        type: createSelect<CompassType>('Режим', '2D', ['2D', '3D']),
    }),
    camera: createSection('Настройки камеры', 'camera', {
        noLimits: createBoolean('Свободная камера', false),
        minDistance: createRange('Дистанция приближения', 50, 30, 800, 10),
        maxDistance: createRange('Дистанция отдаления', 500, 30, 800, 10),
        maxPolarAngle: createRange('Максимальный полярный угол камеры', 89, 0, 180, 1),
    }),
} satisfies AppSettings;

export const appSettings = rawSettings;

export const iconFiles: Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    building: building,
    compass: compass,
    telescope: telescope,
    wind: wind,
    camera: camera,
};

export const sizesToStrokes: Record<IconSize, number> = {
    48: 2,
    36: 2,
    24: 2,
    20: 2,
    16: 3,
    12: 3,
};
