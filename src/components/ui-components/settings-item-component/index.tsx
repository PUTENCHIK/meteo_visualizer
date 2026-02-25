import clsx from 'clsx';
import s from './settings-item-component.module.scss';
import type { SettingsItem } from '@shared/settings';
import { settingsManager } from '@managers/settings-manager';
import { RangeInput } from '@components/range-input';
import { Toggle } from '@components/toggle';

interface SettingsItemComponentProps {
    item: SettingsItem;
    path: string;
    parentDisabled?: boolean;
}

export const SettingsItemComponent = ({
    item,
    path,
    parentDisabled: forceConst = false,
}: SettingsItemComponentProps) => {
    let component;

    const handleChange = (value: any, finalValue?: boolean) => {
        settingsManager.set(path, value, finalValue);
    };

    let disabled = item.disabled || forceConst;
    const visible = item.visible;

    const pathEnable = path.split('.').slice(0, -1).join('.') + '.enable';

    if (visible && settingsManager.get(pathEnable) !== undefined && path !== pathEnable) {
        disabled = disabled || !settingsManager.get(pathEnable);
    }

    switch (item.kind) {
        case 'boolean':
            component = (
                <Toggle
                    value={item.value}
                    onChange={(value) => handleChange(value)}
                    disabled={disabled}
                />
            );
            break;
        case 'number':
            component = (
                <input
                    type='number'
                    min={item.min}
                    max={item.max}
                    value={item.value}
                    step={item.step}
                    onChange={(e) => handleChange(Number(e.target.value))}
                    disabled={disabled}
                />
            );
            break;
        case 'range':
            component = (
                <RangeInput
                    startValue={item.value}
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    onChange={handleChange}
                    disabled={disabled}
                />
            );
            break;
        case 'string':
            component = (
                <input
                    type='text'
                    maxLength={item.maxLength}
                    placeholder={item.placeholder}
                    value={item.value}
                    disabled={disabled}
                />
            );
            break;
        case 'color':
            component = (
                <input
                    type='color'
                    value={item.value}
                    onChange={(e) => handleChange(e.target.value)}
                    disabled={disabled}
                />
            );
            break;
        case 'select':
            component = (
                <select
                    onChange={(e) => handleChange(e.target.value)}
                    disabled={disabled}
                    defaultValue={item.value}>
                    {item.options.map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            component = null;
            break;
    }

    if (visible && item.kind === 'chapter') {
        return (
            <div className={clsx(s['settings-chapter'], disabled && s['disabled'])}>
                <h3>{item.title}</h3>
                <div className={clsx(s['items-box'])}>
                    {Object.entries(item.items).map(([key, item]) => (
                        <SettingsItemComponent
                            key={key}
                            item={item}
                            path={`${path}.${key}`}
                            parentDisabled={disabled}
                        />
                    ))}
                </div>
            </div>
        );
    } else if (visible) {
        return (
            <div className={clsx(s['settings-item'])}>
                <span>{item.title}:</span>
                {component}
            </div>
        );
    } else return null;
};
