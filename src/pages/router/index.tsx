import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@pages/layout';
import { ComplexPage } from '@pages/complex-page';
import { HomePage } from '@pages/home-page';

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/complex',
                element: <ComplexPage />,
            },
        ],
    },
]);
