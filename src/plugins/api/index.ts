import { defaultConfig } from './default';
import type { ExtraConfig } from './types';

/** API 插件 */
function SdkApiPlugin<T extends ExtraConfig = {}>(extraConfig?: T) {
  return (sdk) => ({
    api: {
      ...defaultConfig,
      ...extraConfig,
    },
  });
}

export { SdkApiPlugin };
