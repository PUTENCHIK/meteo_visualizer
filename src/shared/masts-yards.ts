import type { PolarSystemPosition } from '@utils/funcs';

export type MastHeight = 35 | 50;

export type WeatherStationsAmount = 1 | 3;

export interface YardDataItem {
    height: number;
    amount: WeatherStationsAmount;
}

export interface MastsDataItem {
    description?: string;
    height: MastHeight;
    position: PolarSystemPosition;
    rotation?: number;
    yards: YardDataItem[];
}
