import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@pages/layout';
import { ComplexPage } from '@pages/complex-page';

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                path: '/complex',
                element: <ComplexPage />,
            },
        ],
    },
]);
