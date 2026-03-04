import clsx from 'clsx';
import s from './home-page.module.scss';
import { Header } from '@pages/header';
import { useTheme } from '@context/theme-context';
import { Link } from 'react-router-dom';
import { Toggle } from '@components/toggle';

export const HomePage = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={clsx(s['main'])}>
            <Header />
            <div className={clsx(s['content'])}>
                <h1>Meteo Visualizer</h1>

                <Link to={'/complex'}>На страницу комплекса</Link>

                <div className={clsx(s['setting'])}>
                    <span>Тёмная тема:</span>
                    <Toggle value={theme == 'dark'} onChange={toggleTheme} />
                </div>
            </div>
        </div>
    );
};
