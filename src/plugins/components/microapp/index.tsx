import {
  loadMicroApp,
  type FrameworkLifeCycles,
  type ObjectType,
} from 'qiankun';
import React, { memo, useEffect } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

import { sdk } from '@/core';

interface Props {
  /** 微应用名称 */
  name: string;
  /** 微应用挂载节点 */
  rootId: string;
}

const lifeCyclesUtil: FrameworkLifeCycles<ObjectType> = {
  beforeLoad: [
    async (app) => {
      console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
    },
  ],
  beforeMount: [
    async (app) => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
    },
  ],
  afterUnmount: [
    async (app) => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
    },
  ],
};

/** 微应用挂载组件 */
const Microapp: React.FC<Props> = ({ name, rootId }) => {
  const [microAppLoading, setMicroAppLoading] = useStore(
    sdk.store,
    useShallow((state) => [state.microAppLoading, state.setMicroAppLoading]),
  );

  useEffect(() => {
    if (!name) return;

    let instance = sdk.app.microAppsInstance.get(name);
    if (instance) {
      instance?.mount();
    } else {
      const microApp = sdk.app.microApps.find((_) => _.name === name);
      if (!microApp) return;

      setMicroAppLoading(true);
      instance = loadMicroApp(microApp, {}, lifeCyclesUtil);
      instance?.mountPromise?.finally(() => {
        setMicroAppLoading(false);
      });
      sdk.app.microAppsInstance.set(name, instance);
    }

    return () => {
      instance?.unmount();
    };
  }, [name]);

  return (
    <>
      {microAppLoading &&
        sdk.components.renderComponent('Loading', { isMicroApp: true })}
      <main id={rootId}></main>
    </>
  );
};

export default memo(Microapp);
