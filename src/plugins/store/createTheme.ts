import type { StateCreator } from 'zustand';

import type { SDKInstance, ThemeProps } from '@/types';

interface ThemeStoreProps {
  /** 主题 */
  theme: ThemeProps;
  /** 设置主题 */
  setTheme(theme: ThemeProps): void;
}

/**  创建主题切片 */
const createThemeSlice =
  (sdk: SDKInstance): StateCreator<ThemeStoreProps> =>
  (set, get) => ({
    theme: '',

    setTheme: (theme) => {
      set(() => ({ theme })); // 自动合并其他

      // 记录值
      sdk.config.theme = theme;
      sdk.storage.setItem(sdk.storage.themeKey, theme);

      // 设置作用域
      document.documentElement.setAttribute('theme', theme);
    },
  });

export { createThemeSlice };
export type { ThemeStoreProps };
