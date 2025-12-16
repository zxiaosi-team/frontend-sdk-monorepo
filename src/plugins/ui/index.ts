import type { Plugin } from '@/types';
import { merge } from 'es-toolkit';
import { type ComponentType, createElement, type ReactElement } from 'react';

import Login from './login';
import NoPermission from './noPermission';
import NotFound from './notFound';

interface UIOptions {
  /** 组件 */
  [key: string]: ComponentType | ((name: string) => ComponentType);
}

interface UIResults extends Required<UIOptions> {
  /**
   * 获取组件
   * @param name 组件名称
   */
  getComponent(name: string): ComponentType;
  /**
   * 渲染组件
   * @param name 组件名称
   */
  renderComponent(name: string, props?: any): ReactElement;
}

/** 插件名称 */
const pluginName = 'ui';

/**
 * 可复用组件
 * - 详情参考 {@link UIOptions} {@link UIResults}
 * - 内置了 Layout、Loading、Login、Mainapp、Microapp、NotFound 等组件, 可传入覆盖
 * - 组件共享
 *    - 在主应用中, 可通过 use(SdkUIPlugin, { MyComponent }) 传入组件
 *    - 在子应用中, 可通过 sdk.ui.renderComponent('MyComponent') 使用组件
 */
const SdkUIPlugin: Plugin<'ui'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      Login,
      NotFound,
      NoPermission,

      getComponent: (name) => {
        if (!name) throw new Error('Sdk: Component name cannot be empty');
        return sdk.ui[name] as ComponentType;
      },
      renderComponent: (name, props = {}) => {
        const Component = sdk.ui.getComponent(name);
        if (!Component) {
          console.error(`Sdk: Component ${name} not found`);
          return null;
        } else {
          return createElement(Component, props);
        }
      },
    } satisfies UIResults;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SdkUIPlugin };
export type { UIOptions, UIResults };
