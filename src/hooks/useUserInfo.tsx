import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

import { sdk } from '@/core';

/** 用户信息 */
const useUserInfo = () => {
  const [userInfo, setUserInfo, resetUserInfo] = useStore(
    sdk.store,
    useShallow((state) => [
      state.userInfo,
      state.setUserInfo,
      state.resetUserInfo,
    ]),
  );

  return { userInfo, setUserInfo, resetUserInfo };
};

export { useUserInfo };
