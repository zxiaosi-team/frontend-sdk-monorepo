import type { SDKInstance, SDKPlugin, SDKPlugins } from '@/types';

/** SDK 类 */
class SDKCore {
  /** 名称 */
  name?: string;

  /** 插件列表 */
  _plugins: Map<string, any> = new Map();

  /**
   * 将实例挂载到 Window 对象上
   * @param name - 要挂载的属性名
   */
  mount(name: string) {
    this.name = name; // 设置名称

    window[name] = this; // 挂载到 Window 上
  }

  /**
   * 继承实例, 从 Window 对象上获取指定名称的实例并合并属性
   * @param name - 要从 Window 对象上获取的实例名称
   * @throws 当指定的 SDK 实例不存在时抛出错误
   */
  extend(name: string) {
    const target = window[name]; // 从 Window 上获取实例

    if (!target) throw new Error(`SDK "${name}" not found`);

    Object.assign(this, target); // 合并实例属性
  }

  /**
   * 使用插件
   * @param plugin - 插件对象 {@link SDKPlugin}
   * @param options - 插件选项
   */
  use<K extends keyof SDKPlugins>(
    plugin: SDKPlugin<K>,
    options: SDKPlugin<K>['options'] = {},
  ) {
    const { name, install } = plugin;

    if (!name) throw new Error(`SDK - The plugin requires a name`);

    if (typeof install !== 'function')
      throw new Error(
        `SDK - The plugin "${name}" requires an install function`,
      );

    install(this as any, options); // 执行插件函数

    this._plugins.set(name, { ...plugin, options }); // 添加到插件列表

    return this; // 链式调用
  }
}

/** 创建 SDK 实例 */
const sdk = new SDKCore() as SDKInstance; // 创建并返回 SDK 实例

export { SDKCore, sdk };
