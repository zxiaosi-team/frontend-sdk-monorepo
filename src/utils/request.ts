import type { AxiosResponse } from 'axios';

import { sdk } from '@/core';
import type { ApiRequestOption } from '@/plugins/api/http';

/**
 * 生成请求id
 * @param config
 */
export const generateRequestIdUtil = (config: any) => {
  const { requestId, url, method, params, data } = config as ApiRequestOption;
  if (requestId) return requestId;

  return `${method}:${url}?${JSON.stringify(params)}&${JSON.stringify(data)}`;
};

/**
 * 取消请求
 * @param config 请求配置
 */
export const cancelRequestUtil = (config: any) => {
  const requestId = generateRequestIdUtil(config);

  const controller = sdk.api.controllers.get(requestId);
  if (!controller) return;

  controller.abort();
  sdk.api.controllers.delete(requestId);
};

/**
 * 下载文件
 * @param resp 响应数据
 */
export const downloadFileUtil = (resp: AxiosResponse) => {
  // 1. 从响应头中解析文件名
  const contentDisposition = resp.headers['content-disposition'];
  let filename = 'data.txt';

  if (contentDisposition) {
    // 使用正则匹配文件名（兼容带引号和不带引号的情况）
    const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
    if (filenameMatch && filenameMatch[1]) {
      filename = filenameMatch[1];
    }
  }

  // 2. 创建 blob 对象
  const blob = new Blob([resp.data], { type: 'application/pdf' });

  // 3. 创建下载链接
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename; // Specify the file name
  document.body.appendChild(link);
  link.click();

  // 4. 释放 blob 对象
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
