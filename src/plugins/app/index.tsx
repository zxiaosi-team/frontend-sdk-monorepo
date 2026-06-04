import { merge } from 'es-toolkit/object';
import type { MicroApp, ObjectType, RegistrableApp } from 'qiankun';

import type { LocaleProps, SDKPlugin, ThemeProps, UserInfo } from '@/types';

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
   * 获取国际化默认值
   * - 1. 本地缓存 `sdk.storage.getItem(sdk.storage.localeKey)`
   * - 2. sdk中国际化 `sdk.config.locale`
   * - 3. 浏览器语言 `navigator.language`
   * - 4. 默认 `zh-CN`
   */
  getDefaultLocale(): LocaleProps;
  /**
   * 获取主题默认值
   * - 1. 本地缓存 `sdk.storage.getItem(sdk.storage.themeKey)`
   * - 2. sdk中主题 `sdk.config.theme`
   * - 3. 系统主题 `window.matchMedia('(prefers-color-scheme: dark)').matches`
   * - 4. 默认 `light`
   */
  getDefaultTheme(): ThemeProps;
  /**
   * 获取重定向路径
   * - 1. 优先使用指定值 `sdk.config.defaultPath`
   * - 2. 其次使用重定向的值 `sdk.config.redirectField`
   * - 3. 最后使用菜单中第一项 `/`
   */
  getRedirectPath(): string;
  /**
   * 初始化数据
   */
  initData(): void | Promise<void>;
  /**
   * 跳转登录页
   * - 1. 清除 Token
   * - 2. 获取当前页路由
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

      getDefaultLocale() {
        // 1. localStorage
        const localLocale = sdk.storage.getItem(
          sdk.storage.localeKey,
        ) as LocaleProps;
        if (localLocale) return localLocale;

        // 2. sdk中国际化
        const sdkLocale = sdk.config?.locale;
        if (sdkLocale) return sdkLocale;

        // 3. 浏览器语言
        const browserLocale = navigator.language as LocaleProps;
        if (browserLocale) return browserLocale;

        // 4. 默认
        return 'zh-CN';
      },
      getDefaultTheme() {
        // 1. localStorage
        const localTheme = sdk.storage.getItem(
          sdk.storage.themeKey,
        ) as ThemeProps;
        if (localTheme) return localTheme;

        // 2. sdk中主题
        const sdkTheme = sdk.config?.theme;
        if (sdkTheme) return sdkTheme;

        // 3. 系统主题
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        if (media.matches) return media.matches ? 'dark' : 'light';

        // 4. 默认
        return 'light';
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
      initData: () => {},
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
