import type {
  LocaleProps,
  SDKInstance,
  SDKModulesOptions,
  SDKPluginOptions,
  ThemeProps,
} from '@/types';

interface ConfigModule {
  /** 环境变量(主应用共享给微应用变量) */
  env: Record<string, any>;

  /** 主题 */
  theme: ThemeProps;
  /** 语言  */
  locale: LocaleProps;

  /** 登录页路由 */
  loginPath: string;
  /** 登录后跳转的路由 */
  defaultPath: string;
  /** 重定向字段 */
  redirectField?: string;

  /**
   * Qiankun 加载模式 - 仅支持 `load` 模式
   * - `router`: 基于路由模式
   * - `load`: 手动加载模式
   */
  qiankunMode: 'router' | 'load';
}

/** 默认配置 */
const defaultOptions: Partial<ConfigModule> = {
  env: {},

  theme: '',
  locale: '',

  loginPath: '/login',
  defaultPath: '',
  redirectField: 'redirect',

  qiankunMode: 'load',
};

/**
 * 配置插件
 *
 * @example
 * const sdk = createSdk().use(SDKConfigPlugin({
 *   theme: 'light',
 * }));
 * console.log(sdk.api.theme); // 'light'
 */
function SDKConfigPlugin(options?: SDKPluginOptions) {
  return (sdk: SDKInstance) => {
    let realOptions: SDKModulesOptions = {};

    if (typeof options === 'function') {
      realOptions = options(sdk);
    } else if (typeof options === 'object') {
      realOptions = options;
    }

    return { config: { ...defaultOptions, ...realOptions } };
  };
}

export { SDKConfigPlugin };
export type { ConfigModule };
