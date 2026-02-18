import { Vector2 } from 'three';

export type MastHeight = 35 | 50;

export type WeatherStationsAmount = 1 | 3;

export interface YardDataItem {
    height: number;
    amount: WeatherStationsAmount;
}

export interface MastsDataItem {
    height: MastHeight;
    position: Vector2;
    rotation?: number;
    yards: YardDataItem[];
}
