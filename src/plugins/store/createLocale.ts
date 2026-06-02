import type { StateCreator } from 'zustand';

import type { LocaleProps, SDKInstance } from '@/types';

interface LocaleStoreProps {
  /** 语言 */
  locale: LocaleProps;
  /** 设置语言 */
  setLocale(locale: LocaleProps): void;
}

/** 创建语言切片 */
const createLocaleSlice =
  (sdk: SDKInstance): StateCreator<LocaleStoreProps> =>
  (set, get) => ({
    locale: '',

    setLocale: (locale) => {
      set(() => ({ locale })); // 自动合并其他

      // 记录值
      sdk.config.locale = locale;
      sdk.storage.setItem(sdk.storage.localeKey, locale);

      // 设置作用域
      document.documentElement.setAttribute('lang', locale);
    },
  });

export { createLocaleSlice };
export type { LocaleStoreProps };
