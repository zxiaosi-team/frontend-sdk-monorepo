import type { SdkBase } from '@/types';

class Sdk implements SdkBase {
  name: SdkBase['name'];
  _plugins: SdkBase['_plugins'];

  constructor() {
    this.name = '';
    this._plugins = new Map();
  }

  mount(name: string) {
    if (window[name]) return console.error(`The SDK already exists - ${name}`);
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
    if (!window[name]) return console.error(`The SDK not found - ${name}`);
    console.log('%c SDK extended:', 'color: pink; font-weight: bold;', name);

    // 合并实例属性
    Object.assign(this, window[name]);
  }
}

/**
 * sdk 实例
 */
const sdk = new Sdk();

export { sdk };
