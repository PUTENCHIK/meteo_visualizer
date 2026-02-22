import clsx from 'clsx';
import s from './settings-menu.module.scss';
import type { AppSettings } from '@shared/settings';
import { SvgIcon } from '@components/svg-icon';
import { useState } from 'react';
import { SettingsItemComponent } from '@components/settings-item-component';

interface SettingsMenuProps {
    settings: AppSettings;
}

export const SettingsMenu = ({ settings }: SettingsMenuProps) => {
    const [currentSection, setCurrentSection] = useState<string>();

    const handleSectionClick = (key: string) => {
        setCurrentSection(key !== currentSection ? key : undefined);
    };

    return (
        <div className={clsx(s['menu-wrapper'])}>
            <div className={clsx(s['sections-box'])}>
                {Object.entries(settings).map(([key, section]) => (
                    <div
                        key={key}
                        className={clsx(s['section'], key === currentSection && s['current'])}
                        title={section.title}
                        onClick={() => handleSectionClick(key)}>
                        <SvgIcon iconName={section.iconName} size={24} color='white' />
                    </div>
                ))}
            </div>
            {currentSection && (
                <div className={clsx(s['settings-menu'])}>
                    <div className={clsx(s['menu-content'])}>
                        <h2>{settings[currentSection].title}</h2>
                        {Object.entries(settings[currentSection].items).map(([key, item]) => (
                            <SettingsItemComponent key={key} item={item} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
