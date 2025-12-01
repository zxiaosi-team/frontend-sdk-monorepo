export interface SdkBase {
  /** SDK 名称 */
  name: string;
  /** 插件列表 */
  _plugins: Map<string, any>;
  /** 挂载sdk - 主应用挂载 SDK 到 Window */
  mount(name: string): void;
  /** 继承sdk - 子应用从 Window 上继承 SDK */
  extend(name: string): void;
}
