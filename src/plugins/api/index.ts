import type { Plugin, UserInfo } from '@/types';
import {
  type AxiosInstance,
  type AxiosResponse,
  type CreateAxiosDefaults,
} from 'axios';
import { merge } from 'es-toolkit';
import type { RouteObject } from 'react-router-dom';
import Http, { type ApiRequestOption } from './http';

interface ApiOptions {
  /** Axios配置 */
  config?: CreateAxiosDefaults;

  /** 取消请求控制器 */
  controllers?: Map<string, AbortController>;

  /**
   * 自定义请求实例
   * - 替换 SDK 内置的请求实例
   * @example instance = axios.create(options)
   */
  instance?: AxiosInstance;

  /**
   * 获取用户信息
   * {@link UserInfo}
   * @example { data: { user: { ... }, permissions: [], roles: [], settings: {} }, code: 200 }
   */
  getUserInfoApi?(): Promise<AxiosResponse<UserInfo>>;
  /**
   * 获取路由数据
   * {@link RouteObject}
   * @example { data: [{path: '/', name: '首页', element: 'Home'}], code: 200 }
   */
  getRoutesApi?(): Promise<AxiosResponse<RouteObject[]>>;
}

interface ApiResults extends Required<ApiOptions> {
  /**
   * 请求
   * @param url 请求地址
   * @param options 自定义配置项
   */
  request(
    url: string,
    options?: ApiRequestOption,
  ): Promise<AxiosResponse<any, any>>;
}

/** 插件名称 */
const pluginName = 'api';

/**
 * 请求插件
 * - 详情参考 {@link ApiOptions} {@link ApiResults}
 * - 内置了请求, 通过 sdk.api.request 发起请求
 * - 可通过外部传入 instance 自定义请求实例
 * - 预置了获取用户信息, 获取路由接口, 以便组件使用
 * @example sdk.api.request('/getTemp', { method: 'POST', ... })
 * @example sdk.api.request('/getTemp', { method: 'POST', isOriginalData: true }) // 返回原始数据
 * @example sdk.api.request('/getTemp', { method: 'POST', isShowFailMsg: false }) // 不显示错误信息
 * @example sdk.api.request('/getTemp', { method: 'POST', isCancelRequest: false }) // 不自动取消重复请求
 */
const SdkApiPlugin: Plugin<'api'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // Axios 配置
    const axiosConfig = {
      baseURL: '/',
      timeout: 0,
      ...options.config,
    } satisfies ApiOptions['config'];

    // 创建 Axios 实例
    const instance = options?.instance || new Http(axiosConfig).getInstance();

    // 默认插件配置
    const defaultOptions = {
      config: axiosConfig,
      controllers: new Map(),

      instance: null,

      request: (url, options = {}) => {
        return instance.request({
          url,
          isOriginalData: false,
          isShowFailMsg: true,
          isCancelRequest: true,
          ...options,
        });
      },

      getUserInfoApi: () => sdk.api.request('/getUserInfo', { method: 'GET' }),
      getRoutesApi: () => sdk.api.request('/routes', { method: 'GET' }),
    } satisfies ApiResults;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SdkApiPlugin };
export type { ApiOptions, ApiResults };
