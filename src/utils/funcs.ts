import type { PolarSystemPosition } from '@shared/interfaces';
import type { AppSettings, SettingsMap } from '@shared/settings';
import { Vector2 } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

export const polarPosToXY = (pos: PolarSystemPosition) => {
    return new Vector2(
        pos.radius * Math.sin(degToRad(pos.angle)),
        pos.radius * Math.cos(degToRad(pos.angle)),
    );
};

export const createSettingsProxy = <T extends AppSettings>(target: T): SettingsMap<T> => {
    return new Proxy(target, {
        get(obj: any, prop: string) {
            const value = obj[prop];

            if (value && typeof value === 'object' && 'items' in value) {
                return createSettingsProxy(value.items);
            } else if (value && typeof value === 'object' && 'value' in value) {
                return value.value;
            } else return value;
        },
    }) as SettingsMap<T>;
};

export const copyObject = <T extends object>(obj: T): T => {
    if (!obj || typeof obj !== 'object') throw new Error(`obj mush be 'object', not ${typeof obj}`);
    return JSON.parse(JSON.stringify(obj));
};
