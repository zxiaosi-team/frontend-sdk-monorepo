import type { SDKInstance, SDKModulesOptions, SDKPluginOptions } from '@/types';

interface StorageModule {
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

/** 默认配置 */
const defaultOptions: StorageModule = {
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
};

/** 本地缓存插件 */
function SDKStoragePlugin(options?: SDKPluginOptions) {
  return (sdk: SDKInstance) => {
    let realOptions: SDKModulesOptions = {};

    if (typeof options === 'function') {
      realOptions = options(sdk);
    } else if (typeof options === 'object') {
      realOptions = options;
    }

    return { storage: { ...defaultOptions, ...realOptions } };
  };
}

export { SDKStoragePlugin };
export type { StorageModule };
