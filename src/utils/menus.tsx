import type { ObjectType, RegistrableApp } from 'qiankun';
import { createElement } from 'react';
import { Outlet, type RouteObject } from 'react-router-dom';

import { sdk } from '@/core';

type MicroAppsMap = Map<string, RegistrableApp<ObjectType>>;

/**
 * 动态创建Icon
 * @param icon icon名称
 */
export const dynamicIcon = (icon: string) => {
  const antIcon: { [key: string]: any } = {}; // 防止类型报错
  return createElement(antIcon[icon]);
};

/**
 * 处理路由数据
 * @param routes 路由数据
 */
export const handleRoutesUtil = (routes: any[]) => {
  const microAppsMap: MicroAppsMap = new Map();
  const menuData = transformRoutesUtil(routes, microAppsMap);
  const microApps = [...microAppsMap.values()];
  return { microApps, menuData };
};

/**
 * 递归转换路由数据
 * @param routes 路由数据
 * @param microApps 微应用列表
 */
export const transformRoutesUtil = (
  routes: any[],
  microAppsMap: MicroAppsMap,
) => {
  if (!routes || routes?.length === 0) return [];

  return routes.map((item) => {
    let element = null; // 组件

    const { locale, path, icon, component, routeAttr, children } = item;

    // 处理微应用路由
    if (routeAttr) {
      let newRouteAttr = {} as any;

      try {
        newRouteAttr = JSON.parse(routeAttr); // 解析微应用路由属性
      } catch (error) {
        console.error('Sdk: initData - Subapp routeAttr error: ', error);
      }

      const { name, rootId, ...rest } = newRouteAttr;

      // 微应用信息
      const microAppInfo = {
        ...rest,
        name,
        container: `#${rootId}`,
        props: { sdk },
        loader: (loading) => sdk.store.getState().setMicroAppLoading(loading),
      };

      // 添加微应用信息
      microAppsMap.set(name, microAppInfo);

      element = sdk.ui.renderComponent('Microapp', { name, rootId }); // 微应用挂载组件
    } else if (component === 'Outlet') {
      element = <Outlet />; // 路由出口组件
    } else {
      element = sdk.ui.renderComponent(component); // 普通组件
    }

    return {
      ...item,
      key: `${path}_${icon}_${locale}`, // 唯一key, 判断菜单是否折叠
      element,
      children: transformRoutesUtil(children, microAppsMap), // 转换子路由
      handle: {
        // 用户面包屑 https://reactrouter.com/6.30.2/hooks/use-matches
        crumb: (data = {}) => ({ ...item, ...data }),
      },
    };
  });
};

/**
 * 获取第一个页面的路径
 * @param routes 路由数据
 */
export const getFirstPagePathUtil = (routes: RouteObject[]) => {
  let firstPagePath = '/';

  if (!routes || routes.length === 0) return firstPagePath;

  firstPagePath = routes?.[0]?.path;

  if (routes?.[0]?.children && routes?.[0]?.children.length > 0) {
    firstPagePath = getFirstPagePathUtil(routes?.[0]?.children);
  }

  return firstPagePath;
};
