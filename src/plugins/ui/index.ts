import { merge } from 'es-toolkit/object';
import { type ComponentType, createElement, type ReactElement } from 'react';

import type { Plugin } from '@/types';

import './index.css';
import Layout from './layout';
import Loading from './loading';
import Login from './login';
import Microapp from './microapp';
import NoPermission from './noPermission';
import NotFound from './notFound';

interface UIOptions {
  /** 组件 */
  [key: string]:
    | ComponentType
    | ((name: string) => ComponentType)
    | ((component: ComponentType, name?: string) => void);
}

interface UIResults extends Required<UIOptions> {
  /**
   * 设置组件
   * @param component 组件
   * @param name 组件名称
   */
  setComponent(component: ComponentType, name?: string): void;
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
 *    - 在主应用中, 可通过 sdk.use(SdkUIPlugin, { MyComponent }) 传入组件
 *    - 在微应用中, 可通过 sdk.ui.renderComponent('MyComponent') 使用组件
 */
const SdkUIPlugin: Plugin<'ui'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      Layout,
      Loading,
      Login,
      Microapp,
      NotFound,
      NoPermission,

      setComponent: (component, name) => {
        if (!component) {
          console.error('Sdk: SdkUIPlugin - component cannot be empty');
          return;
        }

        const componentName = name || component.displayName || component.name;
        if (!componentName) {
          console.error('Sdk: SdkUIPlugin - Component name cannot be empty');
          return;
        }

        sdk.ui[componentName] = component;
      },
      getComponent: (name) => {
        if (!name) {
          console.error('Sdk: SdkUIPlugin - Component name cannot be empty');
          return null;
        } else {
          return sdk.ui[name] as ComponentType;
        }
      },
      renderComponent: (name, props = {}) => {
        const Component = sdk.ui.getComponent(name);
        if (!Component) {
          console.error(`Sdk: SdkUIPlugin - Component ${name} not found`);
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
