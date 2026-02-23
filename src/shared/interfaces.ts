type ForceEdgesMode = 'with' | 'without';

export interface EdgesEnable {
    forceEdges?: ForceEdgesMode;
}

export interface PolarSystemPosition {
    radius: number;
    angle: number;
}
