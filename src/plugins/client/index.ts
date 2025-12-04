import type { Plugin } from '@/types';
import { merge } from 'es-toolkit';
import type { Location, NavigateFunction, UIMatch } from 'react-router-dom';

interface ClientOptions {}

interface ClientResults extends Required<ClientOptions> {
  /** 主应用 location */
  location: Location;
  /** 主应用navigate（解决子应用跳转问题） */
  navigate: NavigateFunction;
  /** 路由匹配（用于面包屑） */
  matches: UIMatch[];
}

/** 插件名称 */
const pluginName = 'client';

/**
 * 全局路由信息
 * - 详情参考 {@link ClientOptions} {@link ClientResults}
 * - 路由信息 sdk.client.location
 * - 路由跳转 sdk.client.navigate
 * - 面包屑信息 sdk.client.matches
 */
const SdkClientPlugin: Plugin<'client'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      location: null,
      navigate: null,
      matches: null,
    } satisfies ClientResults;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SdkClientPlugin };
export type { ClientOptions, ClientResults };
