import type { NavigateFunction, UIMatch } from 'react-router-dom';

import type { SDKInstance, SDKModulesOptions, SDKPluginOptions } from '@/types';

interface RouterModule {
  /** 主应用 location */
  location: Location;
  /** 路由匹配（用于面包屑） */
  matches: UIMatch[];
  /** 主应用navigate（解决微应用跳转问题） */
  navigate: NavigateFunction;
}

/** 默认配置 */
const defaultOptions = {
  location: null,
  navigate: null,
  matches: null,
};

/** 路由插件 */
function SDKRouterPlugin(options?: SDKPluginOptions) {
  return (sdk: SDKInstance) => {
    let realOptions: SDKModulesOptions = {};

    if (typeof options === 'function') {
      realOptions = options(sdk);
    } else if (typeof options === 'object') {
      realOptions = options;
    }

    return { router: { ...defaultOptions, ...realOptions } };
  };
}

export { SDKRouterPlugin };
export type { RouterModule };
