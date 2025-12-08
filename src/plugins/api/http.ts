import { sdk } from '@/core';
import { cancelRequestUtil, generateRequestIdUtil } from '@/utils';
import { message } from 'antd';
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig,
} from 'axios';
import { merge } from 'es-toolkit';

export interface ApiRequestOption extends AxiosRequestConfig {
  /** 请求唯一key(默认自动生成) */
  requestId?: string;
  /** 是否取消重复请求 */
  isCancelRequest?: boolean;
  /** 是否需要原始数据 */
  isOriginalData?: boolean;
  /** 是否显示错误信息 */
  isShowFailMsg?: boolean;
}

/** 请求类 */
class Http {
  instance: AxiosInstance;

  constructor(options: CreateAxiosDefaults = {}) {
    this.instance = axios.create(options); // 创建实例
    this.defaultRequestInterceptor(); // 添加默认请求拦截器
    this.defaultResponseInterceptor(); // 添加默认响应拦截器
  }

  /** 默认请求拦截器 */
  defaultRequestInterceptor() {
    this.instance.interceptors.request.use(
      function (config: InternalAxiosRequestConfig) {
        // @ts-ignore
        if (config?.isCancelRequest) {
          const requestId = generateRequestIdUtil(config); // 设置请求唯一标识
          cancelRequestUtil(config); // 取消重复请求
          const controller = new AbortController(); // 创建取消请求控制器
          sdk.api.controllers.set(requestId, controller); // 存储取消请求控制器

          config['requestId'] = requestId; // 记录请求id
          config.signal = controller.signal; // 取消请求标识
        }

        const token = sdk.storage.getToken();
        config.headers.lang = sdk.config.locale; // 添加语言到请求头
        config.headers.Authorization = token; // 添加token到请求头
        merge(config.headers, sdk.api.config.headers); // 合并请求头
        return config;
      },
      function (error: AxiosError) {
        console.error(`请求错误`);
        return Promise.reject(error);
      },
    );
  }

  /** 默认响应拦截器 */
  defaultResponseInterceptor() {
    this.instance.interceptors.response.use(
      function (response: AxiosResponse) {
        const { data, config } = response;
        const { isOriginalData, isShowFailMsg, isCancelRequest } =
          config as ApiRequestOption;

        const { code, msg } = data;

        // 跟后端定义的成功标识 非0的都是失败
        if (code !== 0) {
          if (isShowFailMsg) message.error(msg);
          console.error('response error: ', config.url, msg);

          if (code == 20041) sdk.app.pageToLogin(); // 登录过期，跳转登录页
        }

        if (isCancelRequest) sdk.api.controllers.delete(config['requestId']);

        return isOriginalData ? response : response.data;
      },
      function (error: AxiosError) {
        const { response, config } = error;
        const { isShowFailMsg } = config as ApiRequestOption;

        // 如果是取消请求，则不显示错误信息
        if (axios.isCancel(error)) return Promise.reject(error);

        if (response) {
          // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
          const { status, data, statusText } = response as AxiosResponse;

          if (isShowFailMsg) message.error(data.msg || statusText);

          if (status == 401) sdk.app.pageToLogin(); // 登录过期，跳转登录页
        } else {
          // 请求已经成功发起，但没有收到响应
          if (isShowFailMsg)
            message.error('请求超时或服务器异常，请检查网络或联系管理员');

          console.error('Request error:', config.url, error);
        }

        return Promise.reject(error);
      },
    );
  }

  /** 获取实例 */
  getInstance() {
    return this.instance;
  }
}

export default Http;
