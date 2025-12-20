import type { MenuDataItem } from '@ant-design/pro-layout';
import type { MicroApp, ObjectType, RegistrableApp } from 'qiankun';
import type { RouteObject } from 'react-router-dom';

import { merge } from 'es-toolkit';

import type { Plugin, UserInfo } from '@/types';

interface AppOptions {
  /** 菜单数据 */
  menuData?: MenuDataItem[];
  /** 所有路由信息 */
  allRoutes?: RouteObject[];

  /** 微应用信息 */
  microApps?: RegistrableApp<ObjectType>[];
  /** 微应用实例 */
  microAppsInstance?: Map<string, MicroApp>;

  /** 用户信息 */
  user?: UserInfo['user'];
  /** 用户权限 */
  permissions?: UserInfo['permissions'];
  /** 用户角色 */
  roles?: UserInfo['roles'];
  /** 用户设置 */
  settings?: UserInfo['settings'];
}

interface AppResults extends Required<AppOptions> {
  /**
   * 初始化数据
   * - sdk.config.qiankunMode = 'load' 时, 登录时用
   */
  initData(): void;
  /**
   * 清空数据
   * - sdk.config.qiankunMode = 'load' 时, 登出时用
   */
  clearData(): void;
  /**
   * 跳转登录页
   */
  pageToLogin(): void;
  /**
   * 获取重定向路径
   */
  getRedirectPath(): string;
}

/** 插件名称 */
const pluginName = 'app';

/**
 * 项目信息
 * - 详情参考 {@link AppOptions} {@link AppResults}
 * - 菜单信息 sdk.app.menuData
 * - 路由信息 sdk.app.allRoutes
 * - 微应用信息 sdk.app.microApps
 * - 用户信息 sdk.app.user
 * - 用户权限 sdk.app.permissions
 * - 用户角色 sdk.app.roles
 * - 用户设置 sdk.app.settings
 */
const SdkAppPlugin: Plugin<'app'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      menuData: [],
      allRoutes: [],

      microApps: [],
      microAppsInstance: new Map(),

      user: null,
      permissions: [],
      roles: [],
      settings: {},

      initData: null,
      clearData: () => {
        sdk.app.menuData = [];
        sdk.app.allRoutes = sdk.app.allRoutes.filter((_) => _.path !== '/');

        sdk.app.microApps = [];
        sdk.app.microAppsInstance.forEach((_) => _.unmount());
        sdk.app.microAppsInstance.clear();

        sdk.app.user = null;
        sdk.app.permissions = [];
        sdk.app.roles = [];
        sdk.app.settings = {};
      },
      pageToLogin: () => {
        // 清除 Token
        sdk.storage.clearToken();

        // 获取当前页路由
        const pathname = window.location.pathname || '/';
        const loginPath = sdk.config.loginPath;
        const path =
          pathname === loginPath
            ? loginPath
            : `${loginPath}?redirect=${encodeURIComponent(pathname)}`;

        // 跳转登录页
        if (sdk.config.qiankunMode === 'router') {
          window.location.replace(path); // 这里必须刷新一下页面, 否则qiankun实例不会销毁, 登录后会直接mount子应用, 而不是bootstrap子应用
        } else {
          sdk.app.clearData(); // 手动清空数据
          sdk.client.navigate(path, { replace: true }); // 使用客户端路由跳转
        }
      },
      getRedirectPath: () => {
        // 1. 优先使用指定值
        const defaultPath = sdk.config.defaultPath;
        if (defaultPath) return defaultPath;

        // 2. 其次使用重定向的值
        const param = new URLSearchParams(window.location.search);
        const redirect = decodeURIComponent(param.get('redirect') || '');
        if (redirect) return redirect;

        // 3. 最后使用菜单中第一项
        return '/';
      },
    } satisfies AppResults;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SdkAppPlugin };
export type { AppOptions, AppResults };
