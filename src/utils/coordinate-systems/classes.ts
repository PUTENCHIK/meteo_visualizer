import { Vector2 } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

export class PolarPosition {
    public radius: number;
    public angle: number;

    constructor(r: number = 0, a: number = 0) {
        this.radius = r;
        this.angle = a;
    }

    get x(): number {
        return this.radius * Math.sin(degToRad(this.angle));
    }

    get y(): number {
        return this.radius * Math.cos(degToRad(this.angle));
    }

    public toVector2(): Vector2 {
        return new Vector2(this.x, this.y);
    }
}
