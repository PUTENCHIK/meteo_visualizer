import type { IconName } from './icons';

export type SettingsKind =
    | 'boolean'
    | 'number'
    | 'range'
    | 'string'
    | 'color'
    | 'select'
    | 'chapter';

interface BaseSettingsPoint {
    kind: SettingsKind;
}

// Пункт настроек - конкретное значение указанного типа
export interface SettingsPoint<T> extends BaseSettingsPoint {
    title: string;
    value: T;
}

export interface BooleanSettings extends SettingsPoint<boolean> {
    kind: 'boolean';
}

export interface NumberSettings extends SettingsPoint<number> {
    kind: 'number';
    min?: number;
    max?: number;
    step?: number;
}

export interface RangeSettings extends SettingsPoint<number> {
    kind: 'range';
    min: number;
    max: number;
    step: number;
}

export interface StringSettings extends SettingsPoint<string> {
    kind: 'string';
    placeholder?: string;
    maxLength?: number;
}

export interface ColorSettings extends SettingsPoint<string> {
    kind: 'color';
}

export interface SelectSettings<T> extends SettingsPoint<T> {
    kind: 'select';
    options: T[];
}

// Раздел настроек
export interface SettingsChapter extends BaseSettingsPoint {
    kind: 'chapter';
    title: string;
    items: Record<string, SettingsItem>;
}

// Элемент секции или раздела настроек - это пункт или вложенный раздел
export type SettingsItem =
    | BooleanSettings
    | NumberSettings
    | RangeSettings
    | StringSettings
    | ColorSettings
    | SelectSettings<any>
    | SettingsChapter;

// Глобальная секция настроек, отображаемая в худе
export interface SettingSection {
    title: string;
    iconName: IconName;
    items: Record<string, SettingsItem>;
}

export type AppSettings = Record<string, SettingSection>;

export type SettingsMap<T> = {
    [key in keyof T]: T[key] extends { value: infer value }
        ? value // если у T[key] есть value (SettingsPoint)
        : T[key] extends { items: infer items }
          ? SettingsMap<items> // иначе, если у T[key] есть items (SettingsChapter | SettingSection)
          : never; // иначе, непонятно кто это
};
