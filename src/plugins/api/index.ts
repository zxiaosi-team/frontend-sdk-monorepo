import { merge } from 'es-toolkit/object';

import type { Plugin } from '@/types';

import request from './request';

interface ApiOptions {
  /** 请求方法, 默认使用 fetch */
  request?: typeof request;
}

interface ApiResults extends Required<ApiOptions> {}

/** 插件名称 */
const pluginName = 'api';

/**
 * 请求插件
 * - `sdk.api.request` 发起请求
 * - 更多详情参考 {@link ApiOptions} {@link ApiResults}
 */
const SdkApiPlugin: Plugin<'api'> = {
  name: pluginName,
  install(sdk, options = {}) {
    const defaultOptions = {
      request: request,
    } satisfies ApiResults;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SdkApiPlugin };
export type { ApiOptions, ApiResults };
