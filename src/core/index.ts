import type { SdkBase } from '@/types';

class Sdk implements SdkBase {
  name: SdkBase['name'];
  _plugins: SdkBase['_plugins'];

  constructor() {
    this.name = '';
    this._plugins = new Map();
  }

  mount(name: string) {
    if (window[name]) return console.error(`SDK already exists - ${name}`);
    console.log('%c SDK mounted:', 'color: green;', name);

    // 挂载到 Window 上
    this.name = name;
    window[this.name] = this;
  }

  extend(name: string) {
    if (!window[name]) return console.error(`SDK not found ${name}`);
    console.log('%c SDK extended:', 'color: blue', name);

    // 合并实例属性
    Object.assign(this, window[name]);
  }
}

/**
 * sdk 实例
 */
const sdk = new Sdk();

export { sdk };
