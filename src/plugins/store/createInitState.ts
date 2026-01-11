import type { StateCreator } from 'zustand';

import type { UserInfo } from '@/types';

import { sdk } from '@/core';

interface InitStateStoreProps {
  /** 初始状态 */
  initState: UserInfo;
  /** 设置初始状态 */
  setInitState(initState: UserInfo): void;
}

/** 创建初始状态切片 */
const createInitStateSlice: StateCreator<InitStateStoreProps> = (set, get) => ({
  initState: {},
  setInitState: (initState) => {
    set(() => ({ initState }));
    sdk.app = { ...sdk.app, ...initState };
  },
});

export { createInitStateSlice };
export type { InitStateStoreProps };
