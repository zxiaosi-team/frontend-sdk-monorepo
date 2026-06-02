import type { SDKInstance, SDKModulesOptions, SDKPluginOptions } from '@/types';

interface ApiModule {
  /** 请求方法（默认使用 fetch） */
  request<T>(url: string, options: RequestInit): Promise<T>;
}

/** 默认配置 */
const defaultOptions: Partial<ApiModule> = {
  async request(url: string, options: RequestInit = {}) {
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
};

/**
 * 请求插件
 *
 * @example
 * const sdk = createSdk().use(SDKApiPlugin());
 * await sdk.api.request('/api/data', { method: 'GET' });
 *
 * @example
 * const sdk = createSdk().use(SDKApiPlugin((sdk) => ({
 *   get: async (url, options) => {
 *      return sdk.api.request(url, { method: 'GET', ...options });
 *   }
 * })));
 * await sdk.api.get('/api/data');
 */
function SDKApiPlugin(options?: SDKPluginOptions) {
  return (sdk: SDKInstance) => {
    let realOptions: SDKModulesOptions = {};

    if (typeof options === 'function') {
      realOptions = options(sdk);
    } else if (typeof options === 'object') {
      realOptions = options;
    }

    return { api: { ...defaultOptions, ...realOptions } };
  };
}

export { SDKApiPlugin };
export type { ApiModule };
