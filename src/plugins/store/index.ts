import { createStore, type StateCreator } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import type { SDKPlugin } from '@/types';

import { createLocaleSlice, type LocaleStoreProps } from './createLocale';
import {
  createMicroAppLoadingSlice,
  type MicroAppLoadingStoreProps,
} from './createMicroAppLoading';
import { createThemeSlice, type ThemeStoreProps } from './createTheme';
import { createUserInfoSlice, type UserInfoStoreProps } from './createUserInfo';

interface StoreProps
  extends
    LocaleStoreProps,
    MicroAppLoadingStoreProps,
    ThemeStoreProps,
    UserInfoStoreProps {}

type StoreSlice<T = any> = StateCreator<T>;

/** 插件 options */
type StorePluginOptions = Record<string, StoreSlice>;

/**
 * 创建 Store
 * - 这里单独声明变量, 主要是为了使用返回类型 StoreOptions 🤔
 */
const createGlobalStore = (options?: StorePluginOptions) =>
  createStore<StoreProps>()(
    subscribeWithSelector((...a) => ({
      ...createLocaleSlice(...a),
      ...createMicroAppLoadingSlice(...a),
      ...createThemeSlice(...a),
      ...createUserInfoSlice(...a),

      /** 合并外部 slice */
      ...Object.values(options || {}).reduce(
        (acc, createSlice) => ({
          ...acc,
          ...createSlice(...a),
        }),
        {},
      ),
    })),
  );

type StoreOptions = ReturnType<typeof createGlobalStore>;

/** 插件名称 */
const pluginName = 'store';

/**
 * 状态管理插件
 * @example const setTheme = useStore(sdk.store, (state) => state.setTheme)
 * @example const { theme, setTheme } = useStore(sdk.store, useShallow((state) => { theme: state.theme, setTheme: state.setTheme }))
 * @example const [theme, setTheme] = useStore(sdk.store, useShallow((state) => [state.theme, state.setTheme]))
 * @example sdk.store?.getState()?.setTheme('light')
 * @example sdk.store.subscribe((state) => state.theme, (theme) => { console.log('theme', theme) }, { fireImmediately: true }) // fireImmediately 立即变更
 */
const SDKStorePlugin: SDKPlugin = {
  name: pluginName,
  install(sdk, options = {}) {
    sdk[pluginName] = createGlobalStore(options);
  },
};

export { SDKStorePlugin };
export type { StoreOptions, StoreProps, StoreSlice };
