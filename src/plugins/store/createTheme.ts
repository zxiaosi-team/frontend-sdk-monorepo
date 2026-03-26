import type { StateCreator } from 'zustand';

import { sdk } from '@/core';
import type { ThemeProps } from '@/types';

interface ThemeStoreProps {
  /** 主题 */
  theme: ThemeProps;
  /** 设置主题 */
  setTheme(theme: ThemeProps): void;
}

/**  创建主题切片 */
const createThemeSlice: StateCreator<ThemeStoreProps> = (set, get) => ({
  theme: null,

  setTheme: (theme) => {
    set(() => ({ theme })); // 自动合并其他

    // 记录值
    sdk.config.theme = theme;
    sdk.storage.setTheme(theme);

    // 设置作用域
    document.documentElement.setAttribute('theme', theme);
  },
});

export { createThemeSlice };
export type { ThemeStoreProps };
