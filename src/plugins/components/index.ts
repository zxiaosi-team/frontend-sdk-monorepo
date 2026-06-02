import { createElement, type ComponentType, type ReactElement } from 'react';

import type { SDKInstance, SDKModulesOptions, SDKPluginOptions } from '@/types';

import Layout from './layout';
import Loading from './loading';
import Login from './login';
import Microapp from './microapp';
import NoPermission from './noPermission';
import NotFound from './notFound';

import './index.css';

interface ComponentsModule {
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

/** 默认配置 */
const defaultOptions = (sdk: SDKInstance): Partial<ComponentsModule> => ({
  Layout,
  Loading,
  Login,
  Microapp,
  NotFound,
  NoPermission,

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
      return createElement(Component, { ...props, sdk });
    }
  },
});

/**
 * 组件插件
 */
function SDKComponentsPlugin(options?: SDKPluginOptions) {
  return (sdk: SDKInstance) => {
    let realOptions: SDKModulesOptions = {};

    if (typeof options === 'function') {
      realOptions = options(sdk);
    } else if (typeof options === 'object') {
      realOptions = options;
    }

    return { api: { ...defaultOptions(sdk), ...realOptions } };
  };
}

export { SDKComponentsPlugin };
export type { ComponentsModule };
