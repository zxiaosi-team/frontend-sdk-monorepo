import { merge } from 'es-toolkit/object';
import intl from 'react-intl-universal';

import type { Plugin } from '@/types';

interface I18nOptions {
  /**
   * React Intl Universal 实例
   * - 不要解构使用, const { get } = useIntl() 会报错
   * - 如果项目不使用 React Compiler, 可以直接使用 sdk.i18n.intl
   * @example const intl = useIntl(); intl.get(key).d(defaultValue)
   */
  intl?: typeof intl;
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
 * - 集成 React Intl Universal
 * - 需要从外部引入语言包, 详见 intlConfig 和 loadLocale 配置项
 */
const SdkI18nPlugin: Plugin<'i18n'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      intl: intl,
      intlConfig: {},
    } satisfies I18nResults;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SdkI18nPlugin };
export type { I18nOptions, I18nResults };
