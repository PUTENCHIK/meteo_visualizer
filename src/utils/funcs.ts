import type { PolarSystemPosition } from '@shared/interfaces';
import { Vector2 } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

export const polarPosToXY = (pos: PolarSystemPosition) => {
    return new Vector2(
        pos.radius * Math.sin(degToRad(pos.angle)),
        pos.radius * Math.cos(degToRad(pos.angle)),
    );
};
