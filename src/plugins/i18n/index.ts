import { merge } from 'es-toolkit/object';

import type { SDKPlugin } from '@/types';

interface I18nOptions {}

/** 插件名称 */
const pluginName = 'i18n';

/**
 * 国际化插件
 *
 * @example
 * sdk.use(SDKI18nPlugin).mount('xxx');
 */
const SDKI18nPlugin: SDKPlugin = {
  name: pluginName,
  install(sdk, options: {}) {
    const defaultOptions = {} satisfies I18nOptions;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SDKI18nPlugin };
export type { I18nOptions };
