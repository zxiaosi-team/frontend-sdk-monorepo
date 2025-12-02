import type { ConfigOptions, ConfigResults } from '@/plugins/config';

export type ThemeProps = 'light' | 'dark' | (string & {});

export type LocaleProps = 'zh-CN' | 'en-US' | (string & {});

export interface PluginOptions {
  /** Sdk 配置信息 */
  config?: ConfigOptions;
}

export interface PluginResults {
  /** Sdk 配置信息 */
  config: ConfigResults;
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
  /** 继承sdk - 子应用从 Window 上继承 SDK */
  extend(name: string): void;
  /** 使用插件 */
  use<K extends PluginName>(
    plugin: Plugin<K>,
    options?: PluginOptions[K],
  ): this;
}

export type SdkProps = SdkBase & PluginOptions;

export type SdkResult = SdkBase & PluginResults;
