import type { SdkBase } from '@/types';

class Sdk implements SdkBase {
  name: SdkBase['name'];
  _plugins: SdkBase['_plugins'];

  constructor() {
    this.name = '';
    this._plugins = new Map();
  }

  mount(name: string) {
    console.log('%c SDK mounted:', 'color: green; font-weight: bold;', name);

    // 挂载到 Window 上
    this.name = name;
    window[this.name] = this;
  }

  extend(name: string) {
    // 继承实例属性
    if (window[name]) {
      console.log('%c SDK extended:', 'color: blue; font-weight: bold;', name);
      Object.assign(this, window[name]); // 合并实例属性
    } else {
      console.error(`No SDK instance found on window with the name: ${name}`);
    }
  }
}

/**
 * sdk 实例
 */
const sdk = new Sdk();

export { sdk };
