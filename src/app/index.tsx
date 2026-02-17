import React from 'react';
import { Scene } from '@models_/scene';
import clsx from 'clsx';
import './app.css';

export const App: React.FC = () => {
    return (
        <div className={clsx('app')}>
            <Scene />
            {/* <div className={clsx('settings-section')}>
                <h2>Настройки</h2>
                <div className={clsx('fields')}>
                    <label className={clsx('field', 'row')}>
                        <span>Отображение в виде сфер:</span>
                        <input type="checkbox" name="is-sphere" />
                    </label>
                    <label className={clsx('field', 'column')}>
                        <span>Промежуток между частицами:</span>
                        <input type="number" min={1} name="gap" />
                    </label>
                    <label className={clsx('field', 'column')}>
                        <span>Размер частиц:</span>
                        <input type="number" min={1} name="size" />
                    </label>
                </div>
            </div> */}
        </div>
    );
};
