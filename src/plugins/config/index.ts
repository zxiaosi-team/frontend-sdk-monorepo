import type { LocaleProps, Plugin, ThemeProps } from '@/types';
import type { ProLayoutProps } from '@ant-design/pro-layout';
import type { ConfigProviderProps } from 'antd';
import { merge } from 'es-toolkit';
import type { RouteObject } from 'react-router-dom';

interface ConfigOptions {
  /** 环境变量(主应用共享给子应用变量) */
  env?: Record<string, any>;

  /** 主题 */
  theme?: ThemeProps;
  /** 国际化 */
  locale?: LocaleProps;

  /**
   * Qiankun模式(切换模式后请重新打开页面)
   * - router: 基于路由模式
   * - load: 手动加载模式
   */
  qiankunMode?: 'router' | 'load';

  /** 登录页路由 */
  loginPath?: string;
  /**
   * 登录后跳转的路由
   * - 优先使用指定值
   * - 其次使用重定向的值
   * - 最后使用菜单中第一项
   */
  defaultPath?: string;
  /**
   * 自定义路由信息
   * - 目前只支持最外层路由自定义
   * - 会合并到 sdk.app.allRoutes 中
   */
  customRoutes?: RouteObject[];

  /** Antd 配置 */
  antdConfig?: ConfigProviderProps;
  /** ProLayout 配置 */
  proLayoutConfig?: ProLayoutProps;
}

interface ConfigResults extends Required<ConfigOptions> {}

/** 插件名称 */
const pluginName = 'config';

/**
 * Sdk 配置信息
 * - 详情参考 {@link ConfigOptions} {@link ConfigResults}
 * - 配置 env 环境变量
 * - 配置 默认主题、国际化
 * - 配置 Qiankun 模式
 * - 配置 默认登录路径、跳转路径、自定义路由
 * - 配置 Antd 配置、ProLayout 配置
 */
const SdkConfigPlugin: Plugin<'config'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      env: {},

      qiankunMode: 'router',

      theme: null,
      locale: null,

      loginPath: '/login',
      defaultPath: '',
      customRoutes: [],

      antdConfig: {},
      proLayoutConfig: {
        title: 'Demo',
      },
    } satisfies ConfigResults;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SdkConfigPlugin };
export type { ConfigOptions, ConfigResults };
