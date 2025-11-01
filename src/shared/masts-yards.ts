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
    position: [number, number];
    rotation?: number;
    yards: YardDataItem[];
}
