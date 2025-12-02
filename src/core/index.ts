import type { Plugin, PluginOptions, SdkResult } from '@/types';

class Sdk implements SdkResult {
  name: SdkResult['name'];
  _plugins: SdkResult['_plugins'];

  config: SdkResult['config'];

  constructor() {
    this.name = '';
    this._plugins = new Map();
  }

  mount(name: string) {
    if (window[name]) throw new Error(`The SDK already exists - ${name}`);
    console.log('%c SDK mounted:', 'color: pink; font-weight: bold;', name);

    // 设置名称
    this.name = name;

    // 使用 new Proxy 禁止控制台对sdk属性的操作 (仅第一层属性)
    const _this = new Proxy(this, {
      get: (target, key, receiver) => {
        if (!target) return null;
        return Reflect.get(target, key, receiver);
      },
      set: () => {
        console.error('The SDK cannot be modified.');
        return false;
      },
      deleteProperty: () => {
        console.error('The SDK cannot be deleted.');
        return false;
      },
    });

    // 挂载到 Window 上
    window[this.name] = _this;
  }

  extend(name: string) {
    if (!window[name]) throw new Error(`The SDK not found - ${name}`);
    console.log('%c SDK extended:', 'color: pink; font-weight: bold;', name);

    // 合并实例属性
    Object.assign(this, window[name]);
  }

  use<K extends keyof PluginOptions>(
    plugin: Plugin<K>,
    options?: PluginOptions[K],
  ) {
    const { name, install } = plugin;

    if (!name) throw new Error(`${name} plugin has no name`);

    if (typeof install !== 'function')
      throw new Error(`${name} plugin is not a function`);

    // 插件安装
    install(this, options);

    // 添加到插件列表
    this._plugins.set(name, { ...plugin, options });

    // 链式调用
    return this;
  }
}

/**
 * sdk 实例
 */
const sdk = new Sdk();

export { sdk };
