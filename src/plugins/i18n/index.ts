import { merge } from 'es-toolkit/object';

import type { Plugin } from '@/types';

interface I18nOptions {
  /**
   * Intl 实例
   * @example sdk.i18n.intl?.xxx
   */
  intl?: any;
  /**
   * 自定义语言包
   * @example
   * {
   *  'zh-CN': {
   *    test: '测试国际化'
   *  },
   *  'en-US': {
   *    test: 'Test Intl'
   *  }
   * }
   */
  intlConfig?: Record<string, any>;
}

interface I18nResults extends Required<I18nOptions> {}

/** 插件名称 */
const pluginName = 'i18n';

/**
 * 多语言
 * - 详情参考 {@link I18nOptions} {@link I18nResults}
 */
const SdkI18nPlugin: Plugin<'i18n'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      intl: {},
      intlConfig: {},
    } satisfies I18nResults;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SdkI18nPlugin };
export type { I18nOptions, I18nResults };
