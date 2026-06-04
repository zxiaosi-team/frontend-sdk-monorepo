import { merge } from 'es-toolkit/object';
import { createElement, type ComponentType, type ReactElement } from 'react';

import type { SDKPlugin } from '@/types';

import Layout from './layout';
import Loading from './loading';
import Login from './login';
import Microapp from './microapp';

import './index.css';

interface ComponentsOptions {
  /** 组件 */
  [key: string]: any;

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
  getComponent(name: string): ComponentType | null;
  /**
   * 渲染组件
   * @param name 组件名称
   */
  renderComponent(name: string, props?: any): ReactElement | null;
}

/** 插件名称 */
const pluginName = 'components';

/**
 * 组件插件
 *
 * @example
 * sdk.use(SDKComponentsPlugin).mount('xxx');
 * sdk.components.setComponent(组件, '组件名称');
 * sdk.components.renderComponent('组件名称', props);
 */
const SDKComponentsPlugin: SDKPlugin = {
  name: pluginName,
  install(sdk, options = {}) {
    const defaultOptions = {
      Layout,
      Loading,
      Login,
      Microapp,

      setComponent: (component, name) => {
        if (!component) {
          console.error('SDKComponentsPlugin - Component cannot be empty');
          return;
        }

        const componentName = name || component.displayName || component.name;
        if (!componentName) {
          console.error('SDKComponentsPlugin - Component name cannot be empty');
          return;
        }

        sdk.components[componentName] = component;
      },
      getComponent: (name) => {
        if (!name) {
          console.error('SDKComponentsPlugin - Component name cannot be empty');
          return null;
        } else {
          return sdk.components[name] as ComponentType;
        }
      },
      renderComponent: (name, props = {}) => {
        const Component = sdk.components.getComponent(name);
        if (!Component) {
          console.error(`SDKComponentsPlugin - Component ${name} not found`);
          return null;
        } else {
          return createElement(Component, props);
        }
      },
    } satisfies ComponentsOptions;

    sdk[pluginName] = merge(defaultOptions, options);
  },
};

export { SDKComponentsPlugin };
export type { ComponentsOptions };
