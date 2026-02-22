import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@context/theme-context/index.tsx';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from '@pages/router/index.tsx';
import '@styles/global.css';
import '@styles/consts.css';
import '@styles/colors.css';

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <RouterProvider router={AppRouter} />
    </ThemeProvider>,
);
