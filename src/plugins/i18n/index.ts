import type { SDKInstance, SDKModulesOptions, SDKPluginOptions } from '@/types';

interface I18nModule {}

/** 默认配置 */
const defaultOptions: Partial<I18nModule> = {};

/**
 * 国际化插件
 */
function SDKI18nPlugin(options?: SDKPluginOptions) {
  return (sdk: SDKInstance) => {
    let realOptions: SDKModulesOptions = {};

    if (typeof options === 'function') {
      realOptions = options(sdk);
    } else if (typeof options === 'object') {
      realOptions = options;
    }

    return { i18n: { ...defaultOptions, ...realOptions } };
  };
}

export { SDKI18nPlugin };
export type { I18nModule };
