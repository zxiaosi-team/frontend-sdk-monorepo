import type { SDKInstance, SDKPlugin } from '@/types';

/** SDK 类 */
class SDKCore {
  /** 名称 */
  name?: string;

  /** 插件 Map */
  _plugins: Map<string, SDKPlugin<any>> = new Map();

  /** 挂载 */
  mount(name: string) {
    this.name = name; // 设置名称

    window[name] = this; // 挂载到 Window 上
  }

  /** 继承 */
  extend(name: string) {
    const target = window[name]; // 从 Window 上获取实例

    if (!target) throw new Error(`SDK "${name}" not found`);

    Object.assign(this, target); // 合并实例属性
  }

  /** 使用插件 */
  use<T extends Record<string, any>>(plugin: SDKPlugin<T, this>): this & T {
    const result = plugin(this); // 执行插件函数

    this._plugins.set(plugin.name, plugin); // 存储插件

    Object.assign(this, result); // 合并插件返回的属性

    return this as any; // 返回合并后的 SDK 实例
  }
}

/** 创建 SDK 实例 */
function createSdk() {
  return new SDKCore() as SDKInstance; // 创建并返回 SDK 实例
}

export { SDKCore, createSdk };
