import clsx from 'clsx';
import s from './settings-item-component.module.scss';
import type { SettingsItem } from '@shared/settings';
import { settingsManager } from '@managers/settings-manager';
import { RangeInput } from '@components/range-input';

interface SettingsItemComponentProps {
    item: SettingsItem;
    path: string;
}

export const SettingsItemComponent = ({ item, path }: SettingsItemComponentProps) => {
    let Component;

    const handleChange = (value: any) => {
        settingsManager.set(path, value);
    };

    const pathEnable = path.split('.').slice(0, -1).join('.') + '.enable';
    let visible = true;

    if (settingsManager.get(pathEnable) !== undefined && path !== pathEnable) {
        visible = settingsManager.get(pathEnable);
    }

    switch (item.kind) {
        case 'boolean':
            Component = (
                <input
                    type='checkbox'
                    checked={item.value}
                    onChange={(e) => handleChange(e.target.checked)}
                    disabled={item.disabled}
                />
            );
            break;
        case 'number':
            Component = (
                <input
                    type='number'
                    min={item.min}
                    max={item.max}
                    value={item.value}
                    step={item.step}
                    onChange={(e) => handleChange(Number(e.target.value))}
                />
            );
            break;
        case 'range':
            Component = (
                <RangeInput
                    value={item.value}
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    onChange={handleChange}
                />
            );
            break;
        case 'string':
            Component = (
                <input
                    type='text'
                    maxLength={item.maxLength}
                    placeholder={item.placeholder}
                    value={item.value}
                />
            );
            break;
        case 'color':
            Component = (
                <input
                    type='color'
                    value={item.value}
                    onChange={(e) => handleChange(e.target.value)}
                />
            );
            break;
        case 'select':
            Component = (
                <select onChange={(e) => handleChange(e.target.value)}>
                    {item.options.map((value, index) => (
                        <option key={index} value={value} selected={item.value === value}>
                            {value}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            Component = null;
            break;
    }

    if (item.kind === 'chapter') {
        return (
            <div className={clsx(s['settings-chapter'])}>
                <h3>{item.title}</h3>
                <div
                    className={clsx(s['items-box'])}
                    style={{
                        paddingLeft: `20px`,
                    }}>
                    {Object.entries(item.items).map(([key, item]) => (
                        <SettingsItemComponent key={key} item={item} path={`${path}.${key}`} />
                    ))}
                </div>
            </div>
        );
    } else if (visible) {
        return (
            <div className={clsx(s['settings-item'])}>
                <span>{item.title}:</span>
                {Component}
            </div>
        );
    } else return null;
};
