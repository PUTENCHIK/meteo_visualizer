import clsx from 'clsx';
import s from './loader.module.scss';
import { Html, useProgress } from '@react-three/drei';
import { useEffect } from 'react';

type LoaderType = 'line' | 'circle';

interface LoaderProps {
    type: LoaderType;
    withLabel?: boolean;
}

export const Loader = ({ type, withLabel = false }: LoaderProps) => {
    const { progress } = useProgress();

    useEffect(() => {
        document.documentElement.style.setProperty('--progress', `${progress}%`);
    }, [progress]);

    return (
        <Html center>
            <div className={clsx(s['loader-box'])}>
                <span className={clsx(s['loader'], s[type])}></span>
                {withLabel && <span className={clsx(s['label'])}>Loading {progress}%</span>}
            </div>
        </Html>
    );
};
