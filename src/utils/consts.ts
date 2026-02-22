import { type CompassType } from '@models_/compass-model';
import type { OrbidControlSettings } from '@shared/interfaces';
import { type MastsDataItem } from '@shared/masts-yards';
import type { AppSettings, SelectSettings } from '@shared/settings';
import type { IconName, IconSize } from '@shared/icons';
import building from '@assets/building.svg?react';
import compass from '@assets/compass.svg?react';
import telescope from '@assets/telescope.svg?react';
import wind from '@assets/wind.svg?react';
import type React from 'react';

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

export const edgesEnable = true;
export const edgesThreshold = 15;
export const edgesScale = 1;
export const outlinesThickness = 1;

export const orbidControlSettings: OrbidControlSettings = {
    minDistance: 50,
    maxDistance: 500,
    maxPolarAngle: Math.PI / 2.005,
};

export const appSettings = {
    model: {
        title: 'Настройки модели комплекса',
        iconName: 'building',
        items: {
            telescopeModelEnable: {
                title: 'Отображение КСТ-3',
                value: true,
                kind: 'boolean',
            },
            mastPlatesEnable: {
                title: 'Отображение оснований мачт',
                value: true,
                kind: 'boolean',
            },
            edges: {
                title: 'Границы',
                items: {
                    enable: {
                        title: 'Отображение',
                        value: true,
                        kind: 'boolean',
                    },
                    color: {
                        title: 'Цвет',
                        value: 'rgba(0, 0, 0, 1)',
                        kind: 'string',
                    },
                },
                kind: 'chapter',
            },
            colors: {
                title: 'Цвета моделей',
                items: {
                    basePlateColor: {
                        title: 'Цвет базовой плиты',
                        value: 'rgba(116, 116, 116, 1)',
                        kind: 'string',
                    },
                    telescopeModelColor: {
                        title: 'Цвет модели телескопа',
                        value: 'rgba(104, 104, 104, 1)',
                        kind: 'string',
                    },
                    mastModelColor: {
                        title: 'Цвет мачт',
                        value: 'rgba(104, 104, 104, 1)',
                        kind: 'string',
                    },
                    yardModelColor: {
                        title: 'Цвет мачтовых рей',
                        value: 'rgba(104, 104, 104, 1)',
                        kind: 'string',
                    },
                    weatherStationModelColor: {
                        title: 'Цвет метеостанций',
                        value: 'rgba(87, 104, 201, 1)',
                        kind: 'string',
                    },
                },
                kind: 'chapter',
            },
        },
    },
    atmosphere: {
        title: 'Настройки модели атмосферы',
        iconName: 'wind',
        items: {
            enable: {
                title: 'Отображение',
                value: true,
                kind: 'boolean',
            },
            height: {
                title: 'Высота',
                value: 60,
                kind: 'number',
            },
        },
    },
    compass: {
        title: 'Настройки компаса',
        iconName: 'compass',
        items: {
            enable: {
                title: 'Отображение',
                value: true,
                kind: 'boolean',
            },
            mode: {
                title: 'Режим',
                value: '2D',
                options: ['2D', '3D'],
                kind: 'select',
            } satisfies SelectSettings<CompassType>,
        },
    },
} satisfies AppSettings;

export const iconFiles: Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    building: building,
    compass: compass,
    telescope: telescope,
    wind: wind,
};

export const sizesToStrokes: Record<IconSize, number> = {
    48: 2,
    36: 2,
    24: 2,
    20: 2,
    16: 3,
    12: 3,
};
