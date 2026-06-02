import type { MicroApp, ObjectType, RegistrableApp } from 'qiankun';

import type {
  SDKInstance,
  SDKModulesOptions,
  SDKPluginOptions,
  UserInfo,
} from '@/types';

interface AppModule {
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
   * 生成跳转路径
   */
  generatedRedirectPath(): string;
  /**
   * 获取重定向路径
   */
  getRedirectPath(): string;
  /**
   * 卸载微应用
   * - 默认卸载所有微应用
   * - 传入名称数组则卸载指定微应用
   */
  unmountMicroApp(names?: string[]): void;
}

/** 默认配置 */
const defaultOptions = (sdk: SDKInstance): Partial<AppModule> => ({
  menuData: [],
  allRoutes: [],

  microApps: [],
  microAppsInstance: new Map(),

  user: null,
  permissions: [],
  settings: {},

  generatedRedirectPath() {
    // 获取当前页路由
    const path = location.pathname;
    const loginPath = sdk.config.loginPath;
    const redirectField = sdk.config.redirectField || 'redirect';
    const redirect = encodeURIComponent(path || '/');
    const allPath =
      path === loginPath
        ? loginPath
        : `${loginPath}?${redirectField}=${redirect}`;

    return allPath;
  },
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
          sdk.app.microApps = sdk.app.microApps.filter((_) => _.name !== name);
        }
      });
    }
  },
});

/**
 * 应用插件
 *
 * @example
 * const sdk = createSdk().use(SDKAppPlugin({
 *   menuData: [...],
 *   allRoutes: [...],
 * }));
 * sdk.api.unmountMicroApp();
 */
function SDKAppPlugin(options?: SDKPluginOptions) {
  return (sdk: SDKInstance) => {
    let realOptions: SDKModulesOptions = {};

    if (typeof options === 'function') {
      realOptions = options(sdk);
    } else if (typeof options === 'object') {
      realOptions = options;
    }

    return { app: { ...defaultOptions(sdk), ...realOptions } };
  };
}

export { SDKAppPlugin };
export type { AppModule };
