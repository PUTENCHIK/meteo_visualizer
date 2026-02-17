import { Vector2 } from "three";

export enum EMastHeight {
    H35 = 35,
    H50 = 50,
}

export enum EWeatherStationsAmount {
    ONE = 1,
    THREE = 3,
}

export interface YardDataItem {
    height: number;
    amount: EWeatherStationsAmount;
}

export interface MastsDataItem {
    height: number;
    position: Vector2;
    rotation?: number;
    yards: YardDataItem[];
}
