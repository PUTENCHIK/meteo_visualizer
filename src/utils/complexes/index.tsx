import type { PolarSystemPosition } from '@utils/coordinate-systems';
import type { Vector3 } from 'three';
import { Guid } from 'typescript-guid';

export type MastHeight = 35 | 50;

export type WeatherStationsAmount = 1 | 3;

export interface WeatherStation {
    position: Vector3;
    value: number;
}

export interface Yard {
    height: number;
    amount: WeatherStationsAmount;
}

export interface MastConfig {
    name: string;
    yards: Yard[];
    height: MastHeight;
}

export const mastConfigs = [
    {
        name: '35m, 4 stations',
        yards: [
            { amount: 1, height: 2 },
            { amount: 1, height: 4 },
            { amount: 1, height: 10 },
            { amount: 1, height: 35 },
        ],
        height: 35,
    },
    {
        name: '35m, 8 stations',
        yards: [
            { amount: 1, height: 2 },
            { amount: 1, height: 4 },
            { amount: 3, height: 10 },
            { amount: 3, height: 35 },
        ],
        height: 35,
    },
    {
        name: '50m, 11 stations',
        yards: [
            { amount: 1, height: 2 },
            { amount: 1, height: 4 },
            { amount: 3, height: 10 },
            { amount: 3, height: 35 },
            { amount: 3, height: 50 },
        ],
        height: 50,
    },
] as const satisfies readonly MastConfig[];

export type MastConfigName = (typeof mastConfigs)[number]['name'];

export interface Mast {
    id: string;
    prefix: string;
    description?: string;
    position: PolarSystemPosition;
    rotation?: number;
    configName: MastConfigName;
}

export const getMastConfig = (name: MastConfigName): MastConfig => {
    return mastConfigs.find((c) => c.name === name)!;
};
