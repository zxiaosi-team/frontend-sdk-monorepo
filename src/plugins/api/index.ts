import type { SDKPlugin } from '@/types';

interface ApiOptions {}

/** 插件名称 */
const pluginName = 'api';

/**
 * 请求插件
 */
const SDKApiPlugin: SDKPlugin = {
  name: pluginName,
  install(sdk, options = {}) {
    sdk[pluginName] = options;
  },
};

export { SDKApiPlugin };
export type { ApiOptions };
