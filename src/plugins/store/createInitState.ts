import type { StateCreator } from 'zustand';

import type { UserInfo } from '@/types';

import { sdk } from '@/core';

interface InitStateStoreProps {
  /** 初始变量 */
  initState: UserInfo;
  /** 设置初始变量 */
  setInitState(initState: UserInfo): void;
}

/** 初始变量状态 */
const createInitStateSlice: StateCreator<InitStateStoreProps> = (set, get) => ({
  initState: {},
  setInitState: (initState) => {
    set(() => ({ initState }));
    sdk.app = { ...sdk.app, ...initState };
  },
});

export { createInitStateSlice };
export type { InitStateStoreProps };
