import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Register, { action as RegisterAction } from '../components/auth/Register';
import Login, { action as LoginAction } from '../components/auth/Login';
import Catalog, { loader as catalogLoader } from '../components/layouts/Catalog';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import ErrorPage from '../pages/ErrorPage.';
import Productos from '../components/admin/Productos';
import Pedidos from '../components/admin/Pedidos';
import Admin from '../pages/Admin';

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRoutes>
                <Home />
            </PrivateRoutes>
        ),
        errorElement: <ErrorPage />,
        children: [
            // {
            //     index: true,
            //     loader: () => redirect('/category/cafe')
            // },
            {
                path: 'category/:uri',
                element: <Catalog />,
                loader: catalogLoader
            }
        ]
    },
    {
        path: "auth",
        element: (
            <PublicRoutes>
                <Auth />
            </PublicRoutes>
        ),
        children:[
            {
                index: true,
                loader: () => redirect('/auth/login')
            },
            {
                path: "register",
                element: <Register />,
                action: RegisterAction,
            },
            {
                path: "login",
                element: <Login />,
                action: LoginAction,
            }
        ]
    },
    {
        path:  '/admin',
        element:  (
            <PrivateRoutes requiredRole="admin">
                <Admin />
            </PrivateRoutes>
        ),
        children: [
            {
                path: 'productos',
                element: <Productos />,
            },
            {
                path: 'pedidos',
                element: <Pedidos />
            }
        ]
    }
]);

export default function Routes() {
    return <RouterProvider router={router} />
}
