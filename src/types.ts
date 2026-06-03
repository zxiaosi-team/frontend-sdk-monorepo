import type { SDKCore } from '@/core';
import type { ApiOptions } from '@/plugins/api';
import type { AppOptions } from '@/plugins/app';
import type { ComponentsOptions } from '@/plugins/components';
import type { ConfigOptions } from '@/plugins/config';
import type { I18nOptions } from '@/plugins/i18n';
import type { RouterOptions } from '@/plugins/router';
import type { StorageOptions } from '@/plugins/storage';
import type { StoreOptions } from '@/plugins/store';

export type ThemeProps = 'light' | 'dark' | (string & {});

export type LocaleProps = 'zh-CN' | 'en-US' | (string & {});

export interface UserInfo {
  /** 用户信息 */
  user?: any;
  /** 用户权限 */
  permissions?: string[];
  /** 用户设置 */
  settings?: { theme?: ThemeProps; locale?: LocaleProps };
}

declare global {
  interface Window {
    [key: string]: any;
  }
}

export interface SDKPlugins {
  /** 请求 */
  api: ApiOptions;
  /** 应用 */
  app: AppOptions;
  /** 组件 */
  components: ComponentsOptions;
  /** 配置 */
  config: ConfigOptions;
  /** 国际化 */
  i18n: I18nOptions;
  /** 路由 */
  router: RouterOptions;
  /** 本地缓存 */
  storage: StorageOptions;
  /** 状态管理 */
  store: StoreOptions;
}

export interface SDKPlugin {
  /** 插件名称 */
  name: string;
  /** 插件安装方法 */
  install(sdk: SDKInstance, options?: Record<string, any>): void;
  /** 插件配置项 */
  options?: Record<string, any>;
}

export type SDKPluginOptions = Record<string, any | ((...args: any[]) => any)>;

export type SDKInstance = SDKCore & SDKPlugins;
