// import clsx from 'clsx';
// import s from './complex-page.module.scss';
import { CompassModel } from '@models_/compass-model';
import { Scene } from '@models_/scene';
import { useState } from 'react';

export const ComplexPage = () => {

    const [mainCamera, setMainCamera] = useState(null);

    return (
        <>
            <Scene onCameraReady={setMainCamera} />
            <CompassModel mainCamera={mainCamera} />
            {/* <div className={clsx(s['form'])}></div> */}
        </>
    );
};
