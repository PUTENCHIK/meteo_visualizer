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
import { LinkButton } from '@components/link-button';
import { useDialogs } from '@context/dialog-context';
import { ComplexDataDialog } from '@dialogs/complex-data-dialog';
import { WebsocketApiDialog } from '@dialogs/websocket-api-dialog';

export const ComplexPage = () => {
    const navigate = useNavigate();
    const { map: settings } = useSettings();
    const { toggleDialog } = useDialogs();

    const [mainCamera, setMainCamera] = useState<Camera>();

    const handleBackToHomePageClick = () => {
        navigate('/');
    };

    return (
        <>
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
                    <LinkButton
                        title={'Данные комплекса'}
                        onClick={() => toggleDialog('complexData')}
                    />
                    <LinkButton title={'Веб-сокет'} onClick={() => toggleDialog('websocketApi')} />
                </div>
            </div>

            <Scene onCameraReady={setMainCamera} />
            {settings.compass.enable && (
                <CompassModel mainCamera={mainCamera} compassType={settings.compass.type} />
            )}

            <SettingsMenu />

            <ComplexDataDialog />
            <WebsocketApiDialog />
        </>
    );
};
