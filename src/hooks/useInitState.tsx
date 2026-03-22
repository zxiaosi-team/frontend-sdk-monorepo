import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

import { sdk } from '@/core';

/** 初始化变量 */
const useInitState = () => {
  const [initState, setInitState, resetInitState] = useStore(
    sdk.store,
    useShallow((state) => [
      state.initState,
      state.setInitState,
      state.resetInitState,
    ]),
  );

  return { initState, setInitState, resetInitState };
};

export { useInitState };
