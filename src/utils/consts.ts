import { type MastsDataItem } from '@shared/masts-yards';
import { Vector2 } from 'three';

type MastsList = MastsDataItem[];

export const masts: MastsList = [
    {
        height: 35,
        position: new Vector2(-50, -50),
        rotation: 45,
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
        height: 35,
        position: new Vector2(50, 50),
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
        height: 50,
        position: new Vector2(-50, 50),
        rotation: 90,
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
];
