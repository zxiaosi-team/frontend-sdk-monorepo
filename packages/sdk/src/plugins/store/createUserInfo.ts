import type { StateCreator } from 'zustand';

import { sdk } from '@/core';
import type { UserInfo } from '@/types';

const defaultUserInfoState: UserInfo = {
  user: null,
  menus: [],
  permissions: [],
  settings: {},
};

interface UserInfoStoreProps {
  /** 用户信息 */
  userInfo: UserInfo;
  /** 设置用户信息 */
  setUserInfo(userInfo: UserInfo): void;
  /** 重置用户信息 */
  resetUserInfo(): void;
}

/** 创建用户信息切片 */
const createUserInfoSlice: StateCreator<UserInfoStoreProps> = (set, get) => ({
  userInfo: defaultUserInfoState,
  setUserInfo: (userInfo) => {
    set(() => ({ userInfo }));
    sdk.app = { ...sdk.app, ...userInfo };
  },
  resetUserInfo: () => {
    set(() => ({ userInfo: defaultUserInfoState }));
    sdk.app = { ...sdk.app, ...defaultUserInfoState };
  },
});

export { createUserInfoSlice };
export type { UserInfoStoreProps };
