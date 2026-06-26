import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// maintenance routing
//const LoginPage = Loadable(lazy(() => import('views/pages/authentication/Login')));
const LoginKufin = Loadable(lazy(() => import('views/login/LoginKufin')));
const RegisterPage = Loadable(lazy(() => import('views/pages/authentication/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login',
      //element: <LoginPage />
      element: <LoginKufin />
    },
    {
      path: '/pages/register',
      element: <RegisterPage />
    }
  ]
};

export default AuthenticationRoutes;
