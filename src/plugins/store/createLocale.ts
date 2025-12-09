import { sdk } from '@/core';
import type { LocaleProps } from '@/types';
import type { StateCreator } from 'zustand';

interface LocaleStoreProps {
  /** 国际化 */
  locale: LocaleProps;
  /** 设置国际化 */
  setLocale: (locale: LocaleProps) => void;
}

/** 国际化状态 */
const createLocaleSlice: StateCreator<LocaleStoreProps> = (set, get) => ({
  locale: null,

  setLocale: (locale) => {
    set(() => ({ locale })); // 自动合并其他

    // 记录值
    sdk.config.locale = locale;
    sdk.storage.setLocale(locale);

    // 设置作用域
    document.documentElement.setAttribute('lang', locale);
  },
});

export { createLocaleSlice };
export type { LocaleStoreProps };
