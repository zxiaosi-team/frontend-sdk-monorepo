import type { ApiConfig } from './types';

const defaultConfig: ApiConfig = {
  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
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

export { defaultConfig };
