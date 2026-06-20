import type { SDKCore } from '@/core';
import type { ApiOptions } from '@/plugins/api';
import type { AppOptions } from '@/plugins/app';
import type { ComponentsOptions } from '@/plugins/components';
import type { ConfigOptions } from '@/plugins/config';
import type { I18nOptions } from '@/plugins/i18n';
import type { RouterOptions } from '@/plugins/router';
import type { StorageOptions } from '@/plugins/storage';
import type { StoreOptions } from '@/plugins/store';

export type ObjectType = Record<string, any>;

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

export interface SDKPlugin<K extends keyof SDKPlugins> {
  /** 插件名称 */
  name: string;
  /** 插件安装方法 */
  install(sdk: SDKInstance, options?: ObjectType): void;
  /** 插件配置项 */
  options?: Partial<SDKPlugins[K]> & ObjectType;
}

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
export type LoadableApp<T extends object = ObjectType> = {
  /** 微应用唯一名称 */
  name: string;

  /** 微应用入口 */
  entry: string | { scripts?: string[]; styles?: string[]; html?: string };

  /** 传递给微应用的数据 */
  props?: T;
} & (
  | {
      /** 自定义函数 */
      render?: (props: { appContent: string; loading: boolean }) => any;
    }
  | {
      /**
       * 容器节点
       * @example '#root'
       * @example document.querySelector('#root')
       */
      container: string | HTMLElement;
    }
);

/**
 * 生命周期函数
 */
export type LifeCycleFn = (app: LoadableApp, global: typeof window) => any;

/**
 * 生命周期钩子
 */
export interface MicroAppLifeCycles {
  beforeLoad?: LifeCycleFn | Array<LifeCycleFn>;
  beforeMount?: LifeCycleFn | Array<LifeCycleFn>;
  afterMount?: LifeCycleFn | Array<LifeCycleFn>;
  beforeUnmount?: LifeCycleFn | Array<LifeCycleFn>;
  afterUnmount?: LifeCycleFn | Array<LifeCycleFn>;
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
  singular?: boolean | ((app: LoadableApp<any>) => Promise<boolean>);
  /** 自定义的 fetch 方法 */
  prefetch?:
    | boolean
    | 'all'
    | string[]
    | ((apps: any[]) => {
        criticalAppNames: string[];
        minorAppsName: string[];
      });
  /** 指定部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理 */
  excludeAssetFilter?: (url: string) => boolean;

  fetch?:
    | typeof window.fetch
    | { fn?: typeof window.fetch; autoDecodeResponse?: boolean };
  getPublicPath?: (entry: any) => string;
  getTemplate?: (tpl: string) => string;
  postProcessTemplate?: (tplResult: any) => any;

  urlRerouteOnly?: boolean;

  autoStart?: boolean;

  [key: string]: any;
}

/**
 * 微应用实例
 */
export interface MicroAppInstance<T extends object = ObjectType> {
  mount(): Promise<null>;
  unmount(): Promise<null>;
  update?(customProps: Partial<T>): Promise<any>;
  getStatus(): MicroAppStatus;
  loadPromise: Promise<null>;
  bootstrapPromise: Promise<null>;
  mountPromise: Promise<null>;
  unmountPromise: Promise<null>;
}

// #endregion
