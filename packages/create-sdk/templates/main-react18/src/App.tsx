import { sdk } from '@zxiaosi/sdk';
import { useEffect, useState } from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useMatches,
  useNavigate,
} from 'react-router-dom';

import './App.css';

const loader = (loading: boolean) =>
  sdk.store.getState().setMicroAppLoading(loading);

const microApps = [
  {
    name: 'subapp1',
    container: '#sub-app',
    entry: 'http://localhost:5174',
    loader: loader,
    props: { sdk },
  },
  {
    name: 'subapp2',
    container: '#sub-app',
    entry: 'http://localhost:5175',
    loader: loader,
    props: { sdk },
  },
];

/** 记录路由信息 */
const WithRouter = ({ children }: any) => {
  sdk.router.location = useLocation();
  sdk.router.matches = useMatches();
  sdk.router.navigate = useNavigate();
  return children;
};

function App() {
  const loginPath = sdk.config.loginPath;
  const renderComponent = sdk.components.renderComponent;

  const defaultRoutes = [
    { path: loginPath, element: renderComponent('Login') },
    { path: '*', element: <div>404</div> },
  ].map((_) => ({ ..._, element: <WithRouter>{_.element}</WithRouter> }));

  const [routes, setRoutes] = useState(defaultRoutes);

  const initData = () => {
    sdk.app.user = { name: 'zxiaosi' };
    sdk.app.microApps = microApps;

    sdk.app.menus = [
      {
        key: 'Home',
        name: 'Home',
        path: '/home',
        element: (
          <div>
            Home <div className='global-style'>样式隔离</div>
          </div>
        ),
      },
      {
        key: 'Subapp1',
        name: 'Subapp1',
        path: '/subapp1',
        element: renderComponent('Microapp', {
          name: 'subapp1',
          rootId: 'sub-app',
        }),
      },
      {
        key: 'Subapp2',
        name: 'Subapp2',
        path: '/subapp2',
        element: renderComponent('Microapp', {
          name: 'subapp2',
          rootId: 'sub-app',
        }),
      },
    ];

    const allRoutes = [
      ...defaultRoutes,
      { path: '/', element: <Navigate to={'/home'} replace /> },
      {
        path: '/',
        element: <WithRouter>{renderComponent('Layout')}</WithRouter>,
        children: sdk.app.menus,
      },
    ];

    setRoutes(allRoutes);
  };

  useEffect(() => {
    sdk.app.initData = initData;

    const pathName = window.location.pathname;

    if ([loginPath].includes(pathName)) return;
    initData();
  }, []);

  return (
    <RouterProvider
      router={createBrowserRouter(routes)}
      future={{ v7_startTransition: false }}
    />
  );
}

export default App;
