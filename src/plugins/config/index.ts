import { merge } from 'es-toolkit/object';

import type { LocaleProps, SDKPlugin, ThemeProps } from '@/types';

interface ConfigOptions {
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
}

/** 插件名称 */
const pluginName = 'config';

/**
 * 配置插件
 *
 * @example
 * sdk.use(SDKConfigPlugin, { theme: 'light' }).mount('xxx');
 * console.log(sdk.api.theme); // 'light'
 */
const SDKConfigPlugin: SDKPlugin = {
  name: pluginName,
  install(sdk, options: {}) {
    // 默认插件配置
    const defaultOptions = {
      env: {},

      theme: '',
      locale: '',

      loginPath: '/login',
      defaultPath: '',
      redirectField: 'redirect',
    } satisfies ConfigOptions;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SDKConfigPlugin };
export type { ConfigOptions };
