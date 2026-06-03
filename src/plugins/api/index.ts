import { merge } from 'es-toolkit/object';

import type { SDKPlugin } from '@/types';

interface ApiOptions {
  /** 默认请求方法 */
  fetch(url: string, options: RequestInit): Promise<any>;
}

/** 插件名称 */
const pluginName = 'api';

/**
 * 请求插件
 *
 * @example
 * sdk.use(SDKApiPlugin).mount('xxx');
 * await sdk.api.fetch('/api/data', { method: 'GET' });
 *
 * @example
 * sdk.use(SDKApiPlugin, {
 *  get: async (url, options) => {
 *     return sdk.api.fetch(url, { method: 'GET', ...options });
 *   }
 * });
 * await sdk.api.get('/api/data');
 */
const SDKApiPlugin: SDKPlugin = {
  name: pluginName,
  install(sdk, options = {}) {
    const defaultOptions = {
      fetch: async (url: string, options: RequestInit = {}) => {
        const { method, headers, ...rest } = options;

        try {
          const resp = await fetch(url, {
            ...rest,
            method,
            headers: { 'Content-Type': 'application/json', ...headers },
          });

          return await resp.json();
        } catch (error) {
          console.error('SDK - Request failed:', url, error);
          return Promise.reject(error);
        }
      },
    } satisfies ApiOptions;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SDKApiPlugin };
export type { ApiOptions };
