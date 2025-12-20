import { merge } from 'es-toolkit';

import type { LocaleProps, Plugin, ThemeProps } from '@/types';

interface StorageOptions {
  /** 国际化存储名称 */
  localeKey?: string;
  /** 主题存储名称  */
  themeKey?: string;
  /** Token存储名称 */
  tokenKey?: string;
}

interface StorageResults extends Required<StorageOptions> {
  /** 获取当前国际化 */
  getLocale(): LocaleProps;
  /** 设置/切换切换国际化 */
  setLocale(locale: LocaleProps): void;
  /** 清空国际化 */
  clearLocale(): void;

  /** 获取当前主题 */
  getTheme(): ThemeProps;
  /** 设置/切换主题 */
  setTheme(theme: ThemeProps): void;
  /** 清空主题 */
  clearTheme(): void;

  /** 获取当前 Token */
  getToken(): string;
  /** 设置 Token */
  setToken(token: string): void;
  /** 清空 Token */
  clearToken(): void;
}

/** 插件名称 */
const pluginName = 'storage';

/**
 * 本地缓存
 * - 详情参考 {@link StorageOptions} {@link StorageResults}
 * - 配置 localStorage 变量名称
 * - 提供 国际化、主题、Token 的 get、change、clear 方法
 * @example sdk.storage.getToken() // 获取 Token
 * @example sdk.storage.setTheme('dark') // 设置主题
 * @example sdk.storage.clearLocale() // 清空国际化
 */
const SdkStoragePlugin: Plugin<'storage'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      localeKey: 'locale',
      themeKey: 'theme',
      tokenKey: 'token',

      getLocale: () => {
        return localStorage.getItem(sdk.storage.localeKey);
      },
      setLocale: (locale: string) => {
        localStorage.setItem(sdk.storage.localeKey, locale);
      },
      clearLocale: () => {
        localStorage.removeItem(sdk.storage.localeKey);
      },
      getTheme: () => {
        return localStorage.getItem(sdk.storage.themeKey);
      },
      setTheme: (theme: string) => {
        localStorage.setItem(sdk.storage.themeKey, theme);
      },
      clearTheme: () => {
        localStorage.removeItem(sdk.storage.themeKey);
      },
      getToken: () => {
        return localStorage.getItem(sdk.storage.tokenKey);
      },
      setToken: (token: string) => {
        localStorage.setItem(sdk.storage.tokenKey, token);
      },
      clearToken: () => {
        localStorage.removeItem(sdk.storage.tokenKey);
      },
    } satisfies StorageResults;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SdkStoragePlugin };
export type { StorageOptions, StorageResults };
