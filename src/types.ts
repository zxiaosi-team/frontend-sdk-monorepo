import type { ApiOptions, ApiResults } from '@/plugins/api';
import type { AppOptions, AppResults } from '@/plugins/app';
import type { ClientOptions, ClientResults } from '@/plugins/client';
import type { ConfigOptions, ConfigResults } from '@/plugins/config';
import type { I18nOptions, I18nResults } from '@/plugins/i18n';
import type { StorageOptions, StorageResults } from '@/plugins/storage';
import type { StoreOptions, StoreResults } from '@/plugins/store';
import type { UIOptions, UIResults } from '@/plugins/ui';

export type ThemeProps = 'light' | 'dark' | (string & {});

export type LocaleProps = 'zh-CN' | 'en-US' | (string & {});

export interface UserInfo {
  /** 用户信息 */
  user?: any;
  /** 用户权限 */
  permissions?: string[];
  /** 用户角色 */
  roles?: string[];
  /** 用户设置 */
  settings?: { theme?: ThemeProps; locale?: LocaleProps };
}

export interface PluginOptions {
  /** 全局请求 */
  api?: ApiOptions;
  /** 项目信息 */
  app?: AppOptions;
  /** 全局路由信息 */
  client?: ClientOptions;
  /** Sdk 配置信息 */
  config?: ConfigOptions;
  /** 多语言 */
  i18n?: I18nOptions;
  /** 本地缓存 */
  storage?: StorageOptions;
  /** 全局状态管理 */
  store?: StoreOptions;
  /** 可复用组件 */
  ui?: UIOptions;
}

export interface PluginResults {
  /** 全局请求 */
  api: ApiResults;
  /** 项目信息 */
  app: AppResults;
  /** 全局路由信息 */
  client: ClientResults;
  /** Sdk 配置信息 */
  config: ConfigResults;
  /** 多语言 */
  i18n: I18nResults;
  /** 本地缓存 */
  storage: StorageResults;
  /** 全局状态管理 */
  store: StoreResults;
  /** 可复用组件 */
  ui: UIResults;
}

export type PluginName = keyof PluginOptions;

export interface Plugin<K extends PluginName> {
  /** 插件名字 */
  name: K;
  /** 插件安装方法 */
  install(sdk: SdkResult, options?: PluginOptions[K]): void;
  /** 插件配置项 */
  options?: PluginOptions[K];
}

export interface SdkBase {
  /** SDK 名称 */
  name: string;
  /** 插件列表 */
  _plugins: Map<string, any>;
  /** 挂载sdk - 主应用挂载 SDK 到 Window */
  mount(name: string): void;
  /** 继承sdk - 微应用从 Window 上继承 SDK */
  extend(name: string): void;
  /** 使用插件 */
  use<K extends PluginName>(
    plugin: Plugin<K>,
    options?: PluginOptions[K],
  ): this;
}

export type SdkProps = SdkBase & PluginOptions;

export type SdkResult = SdkBase & PluginResults;
