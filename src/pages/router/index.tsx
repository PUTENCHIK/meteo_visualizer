import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@pages/layout';
import { ComplexPage } from '@pages/complex-page';
import { HomePage } from '@pages/home-page';
import { AuthPage } from '@pages/auth-page';
import { ProtectedRoute } from '@pages/protected-route';
import { ComplexesSubPage } from '@pages/complexes-sub-page';
import { MastConfigsSubPage } from '@pages/mast-configs-sub-page';
import { UsersClasterPage } from '@pages/users-claster-page';
import { RolesSubPage } from '@pages/roles-sub-page';
import { MeasuresSubPage } from '@pages/measures-sub-page';
import { UsersSubPage } from '@pages/users-sub-page';
import { ComplexsClasterPage } from '@pages/complexes-claster-page';

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/auth',
                element: <AuthPage />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        path: '/',
                        element: <HomePage />,
                    },
                    {
                        path: 'users',
                        element: <UsersClasterPage />,
                        children: [
                            {
                                path: '',
                                element: <UsersSubPage />,
                            },
                            {
                                path: 'roles',
                                element: <RolesSubPage />,
                            },
                        ],
                    },
                    {
                        path: 'complexes',
                        element: <ComplexsClasterPage />,
                        children: [
                            {
                                path: '',
                                element: <ComplexesSubPage />,
                            },
                            {
                                path: 'mast-configs',
                                element: <MastConfigsSubPage />,
                            },
                            {
                                path: 'measures',
                                element: <MeasuresSubPage />,
                            },
                        ],
                    },
                    {
                        path: 'complexes/:id',
                        element: <ComplexPage />,
                    },
                ],
            },
        ],
    },
]);
