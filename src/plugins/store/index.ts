import { createStore } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import type { Plugin } from '@/types';

import {
  createInitStateSlice,
  type InitStateStoreProps,
} from './createInitState';
import { createLocaleSlice, type LocaleStoreProps } from './createLocale';
import {
  createMicroAppStateSlice,
  type MicroAppStateStoreProps,
} from './createMicroAppLoading';
import { createThemeSlice, type ThemeStoreProps } from './createTheme';

type StoreOptions = InitStateStoreProps &
  LocaleStoreProps &
  MicroAppStateStoreProps &
  ThemeStoreProps;

type StoreResults = typeof globalStore;

/**
 * 创建 Store
 * - 这里单独声明变量, 主要是为了使用返回类型 StoreResults 🤔
 */
const globalStore = createStore<StoreOptions>()(
  subscribeWithSelector((...a) => ({
    ...createInitStateSlice(...a),
    ...createLocaleSlice(...a),
    ...createMicroAppStateSlice(...a),
    ...createThemeSlice(...a),
  })),
);

/** 插件名称 */
const pluginName = 'store';

/**
 * 全局状态管理
 * - 详情参考 {@link StoreOptions} {@link StoreResults}
 * - 此插件不会合并传入属性
 * @example const setTheme = useStore(sdk.store, (state) => state.setTheme)
 * @example const { theme, setTheme } = useStore(sdk.store, useShallow((state) => { theme: state.theme, setTheme: state.setTheme }))
 * @example const [theme, setTheme] = useStore(sdk.store, useShallow((state) => [state.theme, state.setTheme]))
 * @example sdk.store?.getState()?.setTheme('light')
 * @example sdk.store.subscribe((state) => state.theme, (theme) => { console.log('theme', theme) }, { fireImmediately: true }) // fireImmediately 立即变更
 */
const SdkStorePlugin: Plugin<'store'> = {
  name: pluginName,
  install(sdk, options = {}) {
    sdk[pluginName] = globalStore satisfies StoreResults;
  },
};

export { SdkStorePlugin };
export type { StoreOptions, StoreResults };
