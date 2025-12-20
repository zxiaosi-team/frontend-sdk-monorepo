import { loadMicroApp } from 'qiankun';
import React, { memo, useEffect } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

import { sdk } from '@/core';
import { lifeCyclesUtil } from '@/utils';

interface Props {
  /** 子应用名称 */
  name: string;
  /** 子应用挂载节点 */
  rootId: string;
}

/** 子应用挂载组件 */
const Microapp: React.FC<Props> = ({ name, rootId }) => {
  const [microAppLoading, setMicroAppLoading] = useStore(
    sdk.store,
    useShallow((state) => [state.microAppLoading, state.setMicroAppLoading]),
  );

  useEffect(() => {
    if (!name || sdk.config.qiankunMode !== 'load') return;

    const instance = sdk.app.microAppsInstance.get(name);
    if (instance) {
      instance.mount();
    } else {
      const microApp = sdk.app.microApps.find((_) => _.name === name);
      if (!microApp) return;
      setMicroAppLoading(true);
      const newInstance = loadMicroApp(microApp, {}, lifeCyclesUtil);
      newInstance.loadPromise.finally(() => {
        setMicroAppLoading(false);
      });
      sdk.app.microAppsInstance.set(name, newInstance);
    }

    return () => {
      const ins = sdk.app.microAppsInstance.get(name);
      if (ins) ins.unmount();
    };
  }, [name]);

  return (
    <>
      {microAppLoading && <div>{sdk.ui.renderComponent('Loading')}</div>}
      <main id={rootId}></main>
    </>
  );
};

export default memo(Microapp);
