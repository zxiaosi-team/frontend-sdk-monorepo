import { merge } from 'es-toolkit/object';
import type { NavigateFunction, UIMatch } from 'react-router-dom';

import type { SDKPlugin } from '@/types';

interface RouterOptions {
  /** 主应用 location */
  location: Location;
  /** 路由匹配（用于面包屑） */
  matches: UIMatch[];
  /** 主应用navigate（解决微应用跳转问题） */
  navigate: NavigateFunction;
}

/** 插件名称 */
const pluginName = 'router';

/**
 * 路由插件
 *
 * @example
 * sdk.use(SDKI18nPlugin).mount('xxx');
 * sdk.router.location; // 路由信息
 * sdk.router.navigate; // 路由跳转
 * sdk.router.matches; // 面包屑信息
 */
const SDKRouterPlugin: SDKPlugin = {
  name: pluginName,
  install(sdk, options: {}) {
    const defaultOptions = {
      location: null,
      navigate: null,
      matches: null,
    };

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SDKRouterPlugin };
export type { RouterOptions };
