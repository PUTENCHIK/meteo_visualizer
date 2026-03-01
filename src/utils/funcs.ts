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
    SettingsTab,
    SettingsTabItem,
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
            // SettingsSection и SettingsChapter
            if (obj.items && typeof obj.items === 'object') {
                return createSettingsProxy(obj.items)[prop];
            }

            if (obj.kind === 'tab') {
                // SettingsTab.value
                if (prop === 'value') return obj.value;
                // SettingsTabItem
                if (obj.tabs && prop in obj.tabs) {
                    const tabItem = obj.tabs[prop];
                    return createSettingsProxy(tabItem.content);
                }
            }

            const item = obj[prop];
            if (item && typeof item === 'object') {
                // SettingsPoint
                if ('value' in item && item.kind !== 'tab') {
                    return item.value;
                }
                return createSettingsProxy(item);
            }

            return item;
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
        visible: others?.visible ?? true,
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
        visible: others?.visible ?? true,
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
        visible: others?.visible ?? true,
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
        visible: others?.visible ?? true,
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
        visible: others?.visible ?? true,
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
        visible: others?.visible ?? true,
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
        visible: others?.visible ?? true,
        ...others,
    };
};

export const createTabItem = <T extends string, K extends Record<string, SettingsItem>>(
    title: string,
    value: T,
    content: K,
    others?: Partial<Omit<SettingsTabItem, 'kind' | 'title' | 'value' | 'content'>>,
) => {
    return {
        kind: 'tab-item' as const,
        title: title,
        value: value,
        content: content,
        disabled: others?.disabled ?? false,
        visible: others?.visible ?? true,
        ...others,
    };
};

export const createTab = <K extends Record<string, SettingsTabItem>, T extends K[keyof K]['value']>(
    title: string,
    value: T,
    tabs: K,
    others?: Partial<Omit<SettingsTab, 'kind' | 'title' | 'current' | 'tabs'>>,
) => {
    return {
        kind: 'tab' as const,
        title: title,
        value: value,
        tabs: tabs,
        disabled: others?.disabled ?? false,
        visible: others?.visible ?? true,
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
