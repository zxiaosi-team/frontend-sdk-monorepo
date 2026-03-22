import type { StateCreator } from 'zustand';

import { sdk } from '@/core';
import type { UserInfo } from '@/types';

const defaultInitState: UserInfo = {
  user: {},
  permissions: [],
  roles: [],
  settings: {},
};

interface InitStateStoreProps {
  /** 初始状态 */
  initState: UserInfo;
  /** 设置初始状态 */
  setInitState(initState: UserInfo): void;
  /** 重置状态 */
  resetInitState(): void;
}

/** 创建初始状态切片 */
const createInitStateSlice: StateCreator<InitStateStoreProps> = (set, get) => ({
  initState: defaultInitState,
  setInitState: (initState) => {
    set(() => ({ initState }));
    sdk.app = { ...sdk.app, ...initState };
  },
  resetInitState: () => {
    set(() => ({ initState: defaultInitState }));
  },
});

export { createInitStateSlice };
export type { InitStateStoreProps };
