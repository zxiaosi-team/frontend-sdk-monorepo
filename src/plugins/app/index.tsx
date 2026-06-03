import { merge } from 'es-toolkit/object';
import type { MicroApp, ObjectType, RegistrableApp } from 'qiankun';

import type { SDKPlugin, UserInfo } from '@/types';

interface AppOptions {
  /** 菜单数据 */
  menuData: any[];
  /** 所有路由信息 */
  allRoutes: any[];

  /** 微应用信息 */
  microApps: RegistrableApp<ObjectType>[];
  /** 微应用实例 */
  microAppsInstance: Map<string, MicroApp>;

  /** 用户信息 */
  user: UserInfo['user'];
  /** 用户权限 */
  permissions: UserInfo['permissions'];
  /** 用户设置 */
  settings: UserInfo['settings'];

  /**
   * 获取重定向路径
   */
  getRedirectPath(): string;
  /**
   * 跳转登录页
   */
  pageToLogin(): void;
  /**
   * 卸载微应用
   * - 默认卸载所有微应用
   * - 传入名称数组则卸载指定微应用
   */
  unmountMicroApp(names?: string[]): void;
}

/** 插件名称 */
const pluginName = 'app';

/**
 * 应用插件
 *
 * @example
 * sdk.use(SDKAppPlugin, { menuData: [...] }).mount('xxx');
 * sdk.app.unmountMicroApp();
 */
const SDKAppPlugin: SDKPlugin = {
  name: pluginName,
  install(sdk, options = {}) {
    const defaultOptions = {
      menuData: [],
      allRoutes: [],

      microApps: [],
      microAppsInstance: new Map(),

      user: null,
      permissions: [],
      settings: {},

      getRedirectPath() {
        // 1. 优先使用指定值
        const defaultPath = sdk.config.defaultPath;
        if (defaultPath) return defaultPath;

        // 2. 其次使用重定向的值
        const param = new URLSearchParams(window.location.search);
        const redirectField = sdk.config.redirectField || 'redirect';
        const redirect = decodeURIComponent(param.get(redirectField) || '');
        if (redirect) return redirect;

        // 3. 最后使用菜单中第一项
        return '/';
      },
      pageToLogin() {
        // 1. 清除 Token
        sdk.storage.removeItem(sdk.storage.tokenKey);

        // 2. 获取当前页路由
        const path = location.pathname;
        const loginPath = sdk.config.loginPath;
        const redirectField = sdk.config.redirectField || 'redirect';
        const redirect = encodeURIComponent(path || '/');
        const allPath =
          path === loginPath
            ? loginPath
            : `${loginPath}?${redirectField}=${redirect}`;

        sdk.router.navigate(allPath, { replace: true });
      },
      unmountMicroApp(names) {
        if (!names) {
          sdk.app.microAppsInstance.forEach((app) => app.unmount());
          sdk.app.microAppsInstance.clear();
          sdk.app.microApps = [];
        } else {
          names.forEach((name) => {
            const app = sdk.app.microAppsInstance.get(name);
            if (app) {
              app.unmount();
              sdk.app.microAppsInstance.delete(name);
              sdk.app.microApps = sdk.app.microApps.filter(
                (_) => _.name !== name,
              );
            }
          });
        }
      },
    } satisfies AppOptions;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SDKAppPlugin };
export type { AppOptions };
