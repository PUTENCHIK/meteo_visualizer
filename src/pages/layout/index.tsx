import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import s from './layout.module.scss';

export const Layout = () => {
    return (
        <>
            <main className={clsx(s['body'])}>
                <Outlet />
            </main>
        </>
    );
};
