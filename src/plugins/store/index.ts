import { createStore } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { createLocaleSlice, type LocaleStoreProps } from './createLocale';
import {
  createMicroAppLoadingSlice,
  type MicroAppLoadingStoreProps,
} from './createMicroAppLoading';
import { createThemeSlice, type ThemeStoreProps } from './createTheme';
import { createUserInfoSlice, type UserInfoStoreProps } from './createUserInfo';

type StoreOptions = LocaleStoreProps &
  MicroAppLoadingStoreProps &
  ThemeStoreProps &
  UserInfoStoreProps;

import type { SDKInstance, SDKModulesOptions, SDKPluginOptions } from '@/types';

/**
 * 创建 Store
 * - 这里单独声明变量, 主要是为了使用返回类型 StoreResults 🤔
 */
const globalStore = (sdk: SDKInstance) =>
  createStore<StoreOptions>()(
    subscribeWithSelector((...a) => ({
      ...createLocaleSlice(sdk)(...a),
      ...createMicroAppLoadingSlice(sdk)(...a),
      ...createThemeSlice(sdk)(...a),
      ...createUserInfoSlice(sdk)(...a),
    })),
  );

type StoreModule = ReturnType<typeof globalStore>;

/**
 * 状态管理插件
 */
function SDKStorePlugin(options?: SDKPluginOptions) {
  return (sdk: SDKInstance) => {
    let realOptions: SDKModulesOptions = {};

    if (typeof options === 'function') {
      realOptions = options(sdk);
    } else if (typeof options === 'object') {
      realOptions = options;
    }

    return { store: { ...globalStore(sdk), ...realOptions } };
  };
}

export { SDKStorePlugin };
export type { StoreModule };
