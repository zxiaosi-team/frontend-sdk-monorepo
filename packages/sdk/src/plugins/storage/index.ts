import { merge } from 'es-toolkit/object';

import type { SDKPlugin } from '@/types';

interface StorageOptions {
  /** 语言存储名称 */
  localeKey: string;
  /** 主题存储名称  */
  themeKey: string;
  /** Token存储名称 */
  tokenKey: string;

  /** 设置缓存 */
  setItem(key: string, value: string): void;
  /** 获取缓存 */
  getItem(key: string): string | null;
  /** 删除缓存 */
  removeItem(key: string): void;
  /** 清空缓存 */
  clear(): void;
}

/** 插件名称 */
const pluginName = 'storage';

/**
 * 本地缓存插件
 *
 * @example
 * sdk.use(SDKStoragePlugin).mount('xxx');
 */
const SDKStoragePlugin: SDKPlugin<'storage'> = {
  name: pluginName,
  install(sdk, options: {}) {
    const defaultOptions = {
      localeKey: 'locale',
      themeKey: 'theme',
      tokenKey: 'token',

      setItem(key: string, value: string) {
        localStorage.setItem(key, value);
      },
      getItem(key: string) {
        return localStorage.getItem(key);
      },
      removeItem(key: string) {
        localStorage.removeItem(key);
      },
      clear() {
        localStorage.clear();
      },
    } satisfies StorageOptions;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SDKStoragePlugin };
export type { StorageOptions };
