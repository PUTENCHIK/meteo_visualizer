import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@context/theme-context/index.tsx';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from '@pages/router/index.tsx';
import '@styles/global.css';
import '@styles/consts.css';
import '@styles/colors.css';
import { Suspense } from 'react';
import { Loader } from '@components/loader';
import { WebSocketProvider } from '@context/websocket-context';
import { WeatherStationProvider } from '@context/weather-station-context';

createRoot(document.getElementById('root')!).render(
    <WeatherStationProvider>
        <WebSocketProvider>
            <ThemeProvider>
                <Suspense fallback={<Loader type='circle' />}>
                    <RouterProvider router={AppRouter} />
                </Suspense>
            </ThemeProvider>
        </WebSocketProvider>
    </WeatherStationProvider>,
);
