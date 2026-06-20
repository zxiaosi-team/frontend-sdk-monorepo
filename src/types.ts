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

// #region -------------------- MicroApp ----------------------

/**
 * 微应用状态
 */
export type MicroAppStatus =
  | 'NOT_LOADED'
  | 'LOADING_SOURCE_CODE'
  | 'NOT_BOOTSTRAPPED'
  | 'BOOTSTRAPPING'
  | 'NOT_MOUNTED'
  | 'MOUNTING'
  | 'MOUNTED'
  | 'UPDATING'
  | 'UNMOUNTING'
  | 'UNLOADING'
  | 'SKIP_BECAUSE_BROKEN'
  | 'LOAD_ERROR';

/**
 * 微应用配置
 */
export interface LoadableApp<Props extends object = Record<string, any>> {
  /** 微应用唯一名称 */
  name: string;

  /** 微应用入口 */
  entry: string | { scripts?: string[]; styles?: string[]; html?: string };

  /**
   * 容器节点
   * @example '#root'
   * @example document.querySelector('#root')
   */
  container: string | HTMLElement;

  /** 传递给微应用的数据 */
  props?: Props;
}

/**
 * 生命周期函数
 */
export type Lifecycle = (app: LoadableApp) => any;

/**
 * 生命周期钩子
 */
export interface MicroAppLifeCycles {
  beforeLoad?: Lifecycle | Array<Lifecycle>;
  beforeMount?: Lifecycle | Array<Lifecycle>;
  afterMount?: Lifecycle | Array<Lifecycle>;
  beforeUnmount?: Lifecycle | Array<Lifecycle>;
  afterUnmount?: Lifecycle | Array<Lifecycle>;
}

/**
 * 加载配置
 */
export interface LoadMicroAppConfiguration {
  /** 开启沙箱 */
  sandbox?:
    | boolean
    | { strictStyleIsolation?: boolean; experimentalStyleIsolation?: boolean };
  /** 是否为单实例场景，单实例指的是同一时间只会渲染一个微应用 */
  singular?: boolean;
  /** 自定义的 fetch 方法 */
  fetch?: boolean;
  getPublicPath?(entry: any): string;
  getTemplate?(tpl: any): string;
  /** 指定部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理 */
  excludeAssetFilter?(assetUrl: string): boolean;
  [key: string]: any;
}

/**
 * 微应用实例
 */
export interface MicroAppInstance<Props extends object = Record<string, any>> {
  mount(): Promise<void>;
  unmount(): Promise<void>;
  update(customProps: Partial<Props>): Promise<void>;
  getStatus(): MicroAppStatus;
  loadPromise: Promise<void>;
  bootstrapPromise: Promise<void>;
  mountPromise: Promise<void>;
  unmountPromise: Promise<void>;
}

// #endregion
