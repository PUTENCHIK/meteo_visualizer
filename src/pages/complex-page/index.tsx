import clsx from 'clsx';
import s from './complex-page.module.scss';
import { CompassModel } from '@models_/compass-model';
import { Scene } from '@models_/scene';
import type { Camera } from '@react-three/fiber';
import { useState } from 'react';
import { SettingsMenu } from '@components/settings-menu';
import { useSettings } from '@context/use-settings';
import { IconButton } from '@components/icon-button';
import { useNavigate } from 'react-router-dom';
import { Toggle } from '@components/toggle';
import { useSocket } from '@context/websocket-context';

export const ComplexPage = () => {
    const { map: settings } = useSettings();
    const { isConnected, toggleConnection } = useSocket();

    const [mainCamera, setMainCamera] = useState<Camera>();
    const navigate = useNavigate();

    const handleBackToHomePageClick = () => {
        navigate('/');
    };

    return (
        <>
            <Scene onCameraReady={setMainCamera} />
            <div className={clsx(s['header-menu-wrapper'])}>
                <div className={clsx(s['header-group'])}>
                    <IconButton
                        iconName='arrow'
                        title='Назад на главную'
                        onClick={handleBackToHomePageClick}
                    />
                    <h2>Комплекс МАМКА №1243</h2>
                </div>
                <div className={clsx(s['header-group'])}>
                    <div className={clsx(s['header-item'])}>
                        <span>Соединение с веб-сокетом:</span>
                        <Toggle value={isConnected} onChange={toggleConnection} />
                    </div>
                </div>
            </div>
            {settings.compass.enable && (
                <CompassModel mainCamera={mainCamera} compassType={settings.compass.type} />
            )}
            <SettingsMenu />
        </>
    );
};
