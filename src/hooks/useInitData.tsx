import { merge } from 'es-toolkit/object';
import { useEffect, useState } from 'react';
import {
  Navigate,
  useLocation,
  useMatches,
  useNavigate,
  type RouteObject,
} from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

import { sdk } from '@/core';
import { handleRoutesUtil, getFirstPagePathUtil } from '@/utils';

/** 记录路由信息 */
const WithRouter: React.FC<any> = ({ children }) => {
  const location = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();

  merge(sdk.router, { location, matches, navigate });

  return children;
};

/** 初始化数据 */
const useInitData = () => {
  const loginPath = sdk.config.loginPath; // 登录路径

  const Layout = sdk.components.renderComponent('Layout'); // 布局组件
  const Login = sdk.components.renderComponent('Login'); // 登录组件
  const NotFound = sdk.components.renderComponent('NotFound'); // 404组件

  /** 默认路由(最外层路由都要被 WithRouter 包裹, 可以实现不刷新页面跳转) */
  const defaultRoutes: RouteObject[] = [
    { path: loginPath, element: Login },
    { path: '*', element: NotFound },
  ].map((_) => ({
    ..._,
    element: <WithRouter sdk={sdk}>{_.element}</WithRouter>,
  }));

  const [loading, setLoading] = useState(false); // 加载状态(获取初始化数据时)
  const [routes, setRoutes] = useState<RouteObject[]>(defaultRoutes); // 路由

  const [setLocale, setTheme, setUserInfo] = useStore(
    sdk.store,
    useShallow((state) => [state.setLocale, state.setTheme, state.setUserInfo]),
  );

  /** 设置主题和国际化 */
  const setThemeLocale = (apiTheme?: any, apiLocale?: any) => {
    setTheme(apiTheme || sdk.app.getDefaultTheme());
    setLocale(apiLocale || sdk.app.getDefaultLocale());
  };
  /** 获取初始化数据 */
  const initData = async () => {
    try {
      setLoading(() => true);
      const [{ data: userData = {} }, { data: routerData = [] }] =
        await Promise.all([sdk.api.getUserInfoApi(), sdk.api.getRoutesApi()]);
      setLoading(() => false);

      // 设置用户信息
      setUserInfo(userData);

      // 设置主题和语言(每个用户配置的主题和语言)
      const { theme, locale } = userData?.settings || {};
      setThemeLocale(theme, locale);

      // 处理路由数据
      const { microApps = [], menuData = [] } = handleRoutesUtil(
        routerData,
        sdk,
      );

      // 获取首页路径
      const firstPath = getFirstPagePathUtil(menuData);

      // 合并所有路由
      const allRoutes: RouteObject[] = [
        ...defaultRoutes,
        {
          path: '/',
          element: <Navigate to={firstPath} replace />,
        },
        {
          path: '/',
          element: <WithRouter>{Layout}</WithRouter>,
          children: menuData,
          errorElement: NotFound,
        },
      ];

      setRoutes(allRoutes); // 重新赋值，触发路由更新

      sdk.app = {
        ...sdk.app,
        allRoutes,
        microApps,
        menuData,
      };
    } catch (error) {
      console.error(error);
      setLoading(() => false);
    }
  };

  useEffect(() => {
    sdk.app.allRoutes = defaultRoutes;

    const pathName = window.location.pathname;
    const noNeedAuth = [loginPath]?.includes(pathName);

    // 如果时登录页面
    if (noNeedAuth) setThemeLocale();
    else initData();
  }, []);

  return { loading, routes };
};

export { useInitData };
