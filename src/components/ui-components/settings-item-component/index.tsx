import clsx from 'clsx';
import s from './settings-item-component.module.scss';
import type { SettingsItem } from '@shared/settings';

interface SettingsItemComponentProps {
    item: SettingsItem;
    offset?: number;
}

export const SettingsItemComponent = ({ item, offset = 1 }: SettingsItemComponentProps) => {
    let Component;

    switch (item.kind) {
        case 'boolean':
            Component = <div>{item.value ? 1 : 0}</div>;
            break;
        case 'number':
            Component = <input type='number' min={item.min} max={item.max} value={item.value} />;
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
        case 'select':
            Component = (
                <select>
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
                        paddingLeft: `${offset * 20}px`,
                    }}>
                    {Object.entries(item.items).map(([key, item]) => (
                        <SettingsItemComponent key={key} item={item} offset={offset + 1} />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className={clsx(s['settings-item'])}>
                <span>{item.title}:</span>
                {Component}
            </div>
        );
    }
};
