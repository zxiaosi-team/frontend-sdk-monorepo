import { ConfigProvider, Spin } from 'antd';
import { cloneDeep } from 'es-toolkit/object';
import { registerMicroApps, start } from 'qiankun';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
  RouterProvider,
  useLocation,
  useMatches,
  useNavigate,
} from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

import { sdk } from '@/core';
import {
  getDefaultLocaleUtil,
  getDefaultThemeUtil,
  getFirstPagePathUtil,
  handleRoutesUtil,
  lifeCyclesUtil,
} from '@/utils';

/** 记录路由信息 */
const WithClient: React.FC<any> = ({ children }) => {
  const location = useLocation();
  const matches = useMatches();
  const navigate = useNavigate();

  sdk.client.location = location;
  sdk.client.matches = matches;
  sdk.client.navigate = navigate;

  return children;
};

/** 主应用根组件 */
const Mainapp: React.FC = () => {
  const loginPath = sdk.config.loginPath; // 登录路径
  const customRoutes = sdk.config.customRoutes; // 自定义路由
  const isRouterQiankunMode = sdk.config.qiankunMode === 'router'; // 是否使用 qiankun router 模式

  const Loading = (props) => sdk.ui.renderComponent('Loading', props); // 加载组件
  const Layout = sdk.ui.renderComponent('Layout'); // 布局组件
  const Login = sdk.ui.renderComponent('Login'); // 登录组件
  const NotFound = sdk.ui.renderComponent('NotFound'); // 404组件

  /** 默认路由(最外层路由都要被 WithClient 包裹, 可以实现不刷新页面跳转) */
  const defaultRoutes: RouteObject[] = [
    { path: loginPath, element: Login },
    { path: '*', element: NotFound },
    ...customRoutes,
  ].map((_) => ({ ..._, element: <WithClient>{_.element}</WithClient> }));

  const [loading, setLoading] = useState(false); // 加载状态(获取初始化数据时)
  const [routes, setRoutes] = useState<RouteObject[]>(defaultRoutes); // 路由

  const [locale, setLocale, theme, setTheme] = useStore(
    sdk.store,
    useShallow((state) => [
      state.locale,
      state.setLocale,
      state.theme,
      state.setTheme,
    ]),
  );

  // antd 配置
  const antdConfig = useMemo(() => {
    return cloneDeep(sdk.config.antdConfig); // 改变引用地址(触发变更)
  }, [locale, theme]);

  /** 设置主题和国际化 */
  const setThemeLocale = (apiTheme?: any, apiLocale?: any) => {
    setTheme(apiTheme || getDefaultThemeUtil(sdk));
    setLocale(apiLocale || getDefaultLocaleUtil(sdk));
  };
  /** 获取初始化数据 */
  const initData = async () => {
    try {
      setLoading(() => true);
      const [{ data: userData = {} }, { data: routerData = [] }] =
        await Promise.all([sdk.api.getUserInfoApi(), sdk.api.getRoutesApi()]);
      setLoading(() => false);

      // 设置主题和语言(每个用户配置的主题和语言)
      const { theme, locale } = userData?.settings || {};
      setThemeLocale(theme, locale);

      // 处理路由数据
      const { microApps = [], menuData = [] } = handleRoutesUtil(routerData);

      // 使用 qiankun router 模式
      if (isRouterQiankunMode) {
        registerMicroApps(microApps, lifeCyclesUtil); // 注册微应用
        start(); // 启动 qiankun
      }

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
          element: <WithClient>{Layout}</WithClient>,
          children: menuData,
          errorElement: NotFound,
        },
      ];

      setRoutes(allRoutes); // 重新赋值，触发路由更新

      sdk.app = {
        ...sdk.app,
        ...userData,
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
    sdk.app.initData = initData;
    sdk.app.allRoutes = defaultRoutes;

    const paths = sdk.config.customRoutes?.map((item) => item.path);
    const pathName = window.location.pathname;
    const noNeedAuth = [loginPath, ...paths]?.includes(pathName);

    // 如果时登录页面
    if (noNeedAuth) setThemeLocale();
    else initData();
  }, []);

  return (
    <ConfigProvider {...antdConfig}>
      <Suspense fallback={Loading({ isSuspense: true })}>
        {loading ? (
          Loading({ isInitData: true })
        ) : (
          <RouterProvider
            router={createBrowserRouter(routes, { basename: '/' })}
            future={{ v7_startTransition: false }}
          />
        )}
      </Suspense>
    </ConfigProvider>
  );
};

export default Mainapp;
