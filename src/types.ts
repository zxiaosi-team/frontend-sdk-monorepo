import type { SDKCore } from '@/core';
import type { ApiModule } from '@/plugins/api';
import type { AppModule } from '@/plugins/app';
import type { ComponentsModule } from '@/plugins/components';
import type { ConfigModule } from '@/plugins/config';
import type { I18nModule } from '@/plugins/i18n';
import type { RouterModule } from '@/plugins/router';
import type { StorageModule } from '@/plugins/storage';
import type { StoreModule } from '@/plugins/store';

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

export interface SDKModules {
  /** 请求 */
  api: ApiModule;
  /** 应用 */
  app: AppModule;
  /** 组件 */
  components: ComponentsModule;
  /** 配置 */
  config: ConfigModule;
  /** 国际化 */
  i18n: I18nModule;
  /** 路由 */
  router: RouterModule;
  /** 本地缓存 */
  storage: StorageModule;
  /** 状态管理 */
  store: StoreModule;
}

export type SDKPlugin<T extends Record<string, any>, S = any> = (sdk: S) => T;

export type SDKModulesOptions = Record<string, (...args: any[]) => any>;

export type SDKPluginOptions =
  | SDKModulesOptions
  | ((sdk: SDKInstance) => SDKModulesOptions);

export type SDKInstance = SDKCore & SDKModules;
