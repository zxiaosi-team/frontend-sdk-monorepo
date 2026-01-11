import type { StateCreator } from 'zustand';

import intl from 'react-intl-universal';

import type { LocaleProps } from '@/types';

import { sdk } from '@/core';

interface LocaleStoreProps {
  /** 语言 */
  locale: LocaleProps;
  /** 设置语言 */
  setLocale(locale: LocaleProps): void;
}

/** 创建语言切片 */
const createLocaleSlice: StateCreator<LocaleStoreProps> = (set, get) => ({
  locale: null,

  setLocale: (locale) => {
    set(() => ({ locale })); // 自动合并其他

    // 记录值
    sdk.config.locale = locale;
    sdk.storage.setLocale(locale);

    // 设置作用域
    document.documentElement.setAttribute('lang', locale);

    // 设置 React Intl Universal 语言包
    const intlConfig = sdk.i18n.intlConfig;
    intl.init({ currentLocale: locale, locales: intlConfig });

    // 加载 Antd 语言包
    try {
      const localeData = sdk.i18n.loadLocale?.(locale) || undefined;
      sdk.config.antdConfig.locale = localeData;
    } catch (e) {
      console.error('Sdk: createLocaleSlice - sdk.i18n.loadLocale error:', e);
    }
  },
});

export { createLocaleSlice };
export type { LocaleStoreProps };
