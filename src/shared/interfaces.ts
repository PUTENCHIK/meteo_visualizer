type ForceEdgesMode = 'with' | 'without';

export interface EdgesEnable {
    forceEdges?: ForceEdgesMode;
}

export interface OrbidControlSettings {
    minDistance: number;
    maxDistance: number;
    maxPolarAngle: number;
}

export interface PolarSystemPosition {
    radius: number;
    angle: number;
}
