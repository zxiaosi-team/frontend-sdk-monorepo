import type { StateCreator } from 'zustand';

interface MicroAppStateStoreProps {
  /** 子应用加载状态 */
  microAppLoading: boolean;
  /** 设置子应用加载状态 */
  setMicroAppLoading(state: boolean): void;
}

/** 子应用状态 */
const createMicroAppStateSlice: StateCreator<MicroAppStateStoreProps> = (
  set,
  get,
) => ({
  microAppLoading: false,
  setMicroAppLoading: (microAppLoading) => set(() => ({ microAppLoading })),
});

export { createMicroAppStateSlice };
export type { MicroAppStateStoreProps };
