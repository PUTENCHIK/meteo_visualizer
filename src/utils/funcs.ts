import type { IconName } from '@shared/icons';
import type { PolarSystemPosition } from '@shared/interfaces';
import type {
    AppSettings,
    BooleanSettings,
    ColorSettings,
    NumberSettings,
    RangeSettings,
    SelectSettings,
    SettingsChapter,
    SettingsItem,
    SettingsMap,
    StringSettings,
} from '@shared/settings';
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

export const createBoolean = <T extends boolean>(
    title: string,
    value: T,
    others?: Partial<Omit<BooleanSettings, 'kind' | 'title' | 'value'>>,
) => {
    return {
        kind: 'boolean' as const,
        title: title,
        value: value,
        disabled: others?.disabled ?? false,
        ...others,
    };
};

export const createNumber = <T extends number>(
    title: string,
    value: T,
    others?: Partial<Omit<NumberSettings, 'kind' | 'title' | 'value'>>,
) => {
    return {
        kind: 'number' as const,
        title: title,
        value: value,
        min: others?.min,
        max: others?.max,
        step: others?.step,
        disabled: others?.disabled ?? false,
        ...others,
    };
};

export const createRange = <T extends number>(
    title: string,
    value: T,
    min: T,
    max: T,
    step: T,
    others?: Partial<Omit<RangeSettings, 'kind' | 'title' | 'value' | 'min' | 'max' | 'step'>>,
) => {
    return {
        kind: 'range' as const,
        title: title,
        value: value,
        min: min,
        max: max,
        step: step,
        disabled: others?.disabled ?? false,
        ...others,
    };
};

export const createString = <T extends string>(
    title: string,
    value: T,
    others?: Partial<Omit<StringSettings, 'kind' | 'title' | 'value'>>,
) => {
    return {
        kind: 'string' as const,
        title: title,
        value: value,
        disabled: others?.disabled ?? false,
        ...others,
    };
};

export const createColor = <T extends string>(
    title: string,
    value: T,
    others?: Partial<Omit<ColorSettings, 'kind' | 'title' | 'value'>>,
) => {
    return {
        kind: 'color' as const,
        title: title,
        value: value,
        disabled: others?.disabled ?? false,
        ...others,
    };
};

export const createSelect = <T>(
    title: string,
    value: T,
    options: T[],
    others?: Partial<Omit<SelectSettings<T>, 'kind' | 'title' | 'value' | 'options'>>,
) => {
    return {
        kind: 'select' as const,
        title: title,
        value: value,
        options: options,
        disabled: others?.disabled ?? false,
        ...others,
    };
};

export const createChapter = <T extends Record<string, SettingsItem>>(
    title: string,
    items: T,
    others?: Partial<Omit<SettingsChapter, 'kind' | 'title' | 'items'>>,
) => {
    return {
        kind: 'chapter' as const,
        title: title,
        items: items,
        disabled: others?.disabled ?? false,
        ...others,
    };
};

export const createSection = <T extends Record<string, SettingsItem>>(
    title: string,
    iconName: IconName,
    items: T,
) => {
    return {
        title: title,
        iconName: iconName,
        items: items,
    };
};
