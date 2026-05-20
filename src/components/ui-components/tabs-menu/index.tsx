import clsx from 'clsx';
import s from './tabs-menu.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface TabMenuItem {
    title: string;
    link: string;
}

export type Tabs<T extends string = string> = Record<T, string | TabMenuItem>;

interface TabsMenuProps<T extends string> {
    tabs: Tabs<T>;
    current?: T;
    byLocation?: boolean;
    disabled?: boolean;
    onChange?: (value: T) => void;
}

export const TabsMenu = <T extends string>({
    tabs,
    current,
    byLocation = false,
    disabled = false,
    onChange,
}: TabsMenuProps<T>) => {
    const { pathname } = useLocation();

    const handleClick = (value: string, isCurrent: boolean) => {
        if (onChange && !disabled && !isCurrent) onChange(value as T);
    };

    const currentByLocation = useMemo(() => {
        let current;
        for (const key in tabs) {
            const item = tabs[key];
            const link = typeof item === 'string' ? item : item.link;

            if (pathname.endsWith(link)) {
                current = key;
            }
        }
        return current;
    }, [tabs, pathname]);

    return (
        <div className={clsx(s['tabs-menu'])}>
            {(Object.entries(tabs) as [T, string | TabMenuItem][]).map(([key, item]) => {
                const title = typeof item === 'string' ? item : item.title;
                const Component = typeof item === 'string' ? 'button' : Link;
                const to = typeof item === 'string' ? key : item.link;
                const isCurrent = key === current || (byLocation && key === currentByLocation);

                return (
                    <Component
                        key={key}
                        to={to}
                        type='button'
                        className={clsx(s['tab-item'], 'link-reset', isCurrent && s['current'])}
                        disabled={disabled}
                        onClick={() => handleClick(key, isCurrent)}>
                        {title}
                    </Component>
                );
            })}
        </div>
    );
};
