import type { OrbidControlSettings } from '@shared/interfaces';
import { type MastsDataItem } from '@shared/masts-yards';

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
