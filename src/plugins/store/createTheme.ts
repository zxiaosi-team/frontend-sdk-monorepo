import { sdk } from '@/core';
import type { ThemeProps } from '@/types';
import { theme as antdTheme } from 'antd';
import type { StateCreator } from 'zustand';

const { defaultAlgorithm, darkAlgorithm } = antdTheme;

interface ThemeStoreProps {
  /** 主题 */
  theme: ThemeProps;
  /** 设置主题 */
  setTheme: (theme: ThemeProps) => void;
}

/** 主题状态 */
const createThemeSlice: StateCreator<ThemeStoreProps> = (set, get) => ({
  theme: null,

  setTheme: (theme) => {
    set(() => ({ theme })); // 自动合并其他

    // 记录值
    sdk.config.theme = theme;
    sdk.storage.setTheme(theme);

    // 设置作用域
    document.documentElement.setAttribute('theme', theme);

    // 设置Antd主题算法
    const algorithm = theme === 'light' ? defaultAlgorithm : darkAlgorithm;
    sdk.config.antdConfig.theme.algorithm = algorithm;
  },
});

export { createThemeSlice };
export type { ThemeStoreProps };
