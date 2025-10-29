import React from 'react';
import { Scene } from '@components/scene';
import clsx from 'clsx';
import './app.css';

export const App: React.FC = () => {
    return (
        <div className={clsx('app')}>
            <Scene />
        </div>
    );
};
