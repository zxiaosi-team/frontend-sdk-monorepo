import type { AnyObject, Plugin } from './types';

/** SDK 类 */
class SDK<T extends AnyObject = {}> {
  name?: string;

  mount(name: string) {
    this.name = name; // 设置名称

    window[name] = this; // 挂载到 Window 上
  }

  extend(name: string) {
    const target = window[name]; // 从 Window 上获取实例

    if (!target) throw new Error(`SDK "${name}" not found`);

    Object.assign(this, target); // 合并实例属性
  }

  use<U extends AnyObject>(plugin: Plugin<U>): SDK<T & U> & T & U {
    const result = plugin(this); // 执行插件函数

    Object.assign(this, result); // 合并插件返回的属性

    return this as any; // 返回合并后的 SDK 实例
  }
}

/** 创建 SDK 实例 */
export function createSdk() {
  return new SDK();
}
