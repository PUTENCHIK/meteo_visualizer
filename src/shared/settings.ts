import type { IconName } from './icons';

export type SettingsKind =
    | 'boolean'
    | 'number'
    | 'range'
    | 'string'
    | 'color'
    | 'select'
    | 'chapter'
    | 'tab'
    | 'tab-item';

interface BaseSettingsPoint {
    kind: SettingsKind;
    title: string;
    disabled?: boolean;
    visible?: boolean;
}

// Пункт настроек - конкретное значение указанного типа
export interface SettingsPoint<T> extends BaseSettingsPoint {
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
    items: Record<string, SettingsItem>;
}

// Вкладка с настройками
export interface SettingsTabItem extends SettingsPoint<string> {
    kind: 'tab-item';
    content: Record<string, SettingsItem>;
}

// Меню с вкладками настроек
export interface SettingsTab extends SettingsPoint<string> {
    kind: 'tab';
    tabs: Record<string, SettingsTabItem>;
}

// Элемент секции или раздела настроек - это пункт или вложенный раздел
export type SettingsItem =
    | BooleanSettings
    | NumberSettings
    | RangeSettings
    | StringSettings
    | ColorSettings
    | SelectSettings<any>
    | SettingsChapter
    | SettingsTab;

// Глобальная секция настроек, отображаемая в худе
export interface SettingSection {
    title: string;
    iconName: IconName;
    items: Record<string, SettingsItem>;
}

export type AppSettings = Record<string, SettingSection>;

export type SettingsMap<T> = {
    // SettingsTab
    [key in keyof T]: T[key] extends { kind: 'tab' }
        ? { value: T[key] extends { value: infer V } ? V : string } & SettingsMap<
              T[key] extends { tabs: infer Tabs } ? Tabs : never
          >
        : // SettingsTabItem
          T[key] extends { kind: 'tab-item' }
          ? // { value: T[key] extends SettingsTabItem<infer C> ? C : never } &
            SettingsMap<T[key] extends { content: infer C } ? C : never>
          : // SettingsPoint
            T[key] extends { value: infer V }
            ? V
            : // SettingSection или SettingChapter
              T[key] extends { items: infer I }
              ? SettingsMap<I>
              : T[key];
};
