// import { Header } from '@pages/header';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import s from './layout.module.scss';

export const Layout = () => {
    return (
        <>
            {/* <Header /> */}
            <main className={clsx(s['body'])}>
                <Outlet />
                {/* <div className={clsx(s['content'])}>
                </div> */}
            </main>
        </>
    );
};
