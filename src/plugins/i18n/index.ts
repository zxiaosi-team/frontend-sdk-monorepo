import type { Plugin } from '@/types';
import { merge } from 'es-toolkit';
import intl from 'react-intl-universal';

interface I18nOptions {
  /**
   * React Intl Universal
   * - 不要解构使用, const { get } = useIntl() 会报错
   * - 如果项目不使用 React Compiler, 可以直接使用 sdk.i18n.intl
   * @example const intl = useIntl(); intl.get(key).d(defaultValue)
   */
  intl?: typeof intl;
  /**
   * React Intl Universal 配置的语言包
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
  /**
   * 加载 Antd 语言包
   * @param locale 语言包名
   * @example
   * import enUS from 'antd/es/locale/en_US';
   * import zhCN from 'antd/es/locale/zh_CN';
   * import dayjs from 'dayjs';
   * import 'dayjs/locale/en';
   * import 'dayjs/locale/zh';
   *
   * const loadLocale = (locale: string) => {
   *   switch (locale) {
   *     case 'en-US':
   *       dayjs.locale('en');
   *       return enUS;
   *     case 'zh-CN':
   *       dayjs.locale('zh');
   *       return zhCN;
   *     default:
   *       return undefined;
   *   }
   * }
   */
  loadLocale?(locale: string): any;
}

interface I18nResults extends Required<I18nOptions> {}

/** 插件名称 */
const pluginName = 'i18n';

/**
 * 多语言
 * - 详情参考 {@link I18nOptions} {@link I18nResults}
 * - 集成 React Intl Universal 和 Antd 国际化
 * - 需要从外部引入语言包, 详见 intlConfig 和 loadLocale 配置项
 */
const SdkI18nPlugin: Plugin<'i18n'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      intl: intl,
      intlConfig: {},
      loadLocale: (locale: string) => undefined,
    } satisfies I18nResults;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SdkI18nPlugin };
export type { I18nOptions, I18nResults };
