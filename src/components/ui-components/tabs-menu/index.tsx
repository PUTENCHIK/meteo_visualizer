import clsx from 'clsx';
import s from './tabs-menu.module.scss';

interface TabsMenuProps {
    current: string;
    tabs: Record<string, string>;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

export const TabsMenu = ({ current, tabs, disabled = false, onChange }: TabsMenuProps) => {
    const handleClick = (value: string, isCurrent: boolean) => {
        if (onChange && !disabled && !isCurrent) onChange(value);
    };

    return (
        <div className={clsx(s['tabs-menu'])}>
            {Object.entries(tabs).map(([value, title]) => {
                const isCurrent = value === current;
                return (
                    <div
                        key={value}
                        className={clsx(
                            s['tab-item'],
                            isCurrent && s['current'],
                            disabled && s['disabled'],
                        )}
                        onClick={() => handleClick(value, isCurrent)}>
                        {title}
                    </div>
                );
            })}
        </div>
    );
};
