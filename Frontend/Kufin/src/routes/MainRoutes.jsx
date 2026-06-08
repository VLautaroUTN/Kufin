import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// -------------- GASTOS --------------
const ListaGastos = Loadable(lazy(() => import('views/gastos/ListaGastos')));

// ------------------- LOGIN ------------------
const LoginKufin = Loadable(lazy(() => import('views/login/LoginKufin')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    // ---> AQUÍ AGREGAMOS LA RUTA DE GASTOS <---
    {
      path: 'gastos',
      element: <ListaGastos />
    },
    {
      path: 'login',
      element: <LoginKufin />
    }
  ]
};

export default MainRoutes;
