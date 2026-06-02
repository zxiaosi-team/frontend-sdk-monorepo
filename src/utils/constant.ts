import type { FrameworkLifeCycles, ObjectType } from 'qiankun';

import type { LocaleProps, SDKInstance, ThemeProps } from '@/types';

/** qiankun 生命周期 钩子函数 */
export const lifeCyclesUtil: FrameworkLifeCycles<ObjectType> = {
  beforeLoad: [
    async (app) => {
      console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
    },
  ],
  beforeMount: [
    async (app) => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
    },
  ],
  afterUnmount: [
    async (app) => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
    },
  ],
};

/**
 * 获取主题默认值
 * @param sdk sdk
 */
export const getDefaultThemeUtil = (sdk: SDKInstance): ThemeProps => {
  // localStorage > sdk中主题 > 系统主题 > 默认

  // 1. localStorage
  const localTheme = sdk.storage.getItem(sdk.storage.themeKey) as ThemeProps;
  if (localTheme) return localTheme;

  // 2. sdk中主题
  const sdkTheme = sdk.config?.theme;
  if (sdkTheme) return sdkTheme;

  // 3. 系统主题
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  if (media.matches) return media.matches ? 'dark' : 'light';

  // 4. 默认
  return 'light';
};

/**
 * 获取国际化默认值
 * @param sdk sdk
 */
export const getDefaultLocaleUtil = (sdk: SDKInstance): LocaleProps => {
  // localStorage > sdk中国际化 > 浏览器语言 > 默认

  // 1. localStorage
  const localLocale = sdk.storage.getItem(sdk.storage.localeKey) as LocaleProps;
  if (localLocale) return localLocale;

  // 2. sdk中国际化
  const sdkLocale = sdk.config?.locale;
  if (sdkLocale) return sdkLocale;

  // 3. 浏览器语言
  const browserLocale = navigator.language as LocaleProps;
  if (browserLocale) return browserLocale;

  // 4. 默认
  return 'zh-CN';
};
