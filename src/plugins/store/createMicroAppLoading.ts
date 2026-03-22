import type { StateCreator } from 'zustand';

interface MicroAppLoadingStoreProps {
  /** 微应用加载状态 */
  microAppLoading: boolean;
  /** 设置微应用加载状态 */
  setMicroAppLoading(state: boolean): void;
}

/** 创建微应用状态切片 */
const createMicroAppLoadingSlice: StateCreator<MicroAppLoadingStoreProps> = (
  set,
  get,
) => ({
  microAppLoading: false,
  setMicroAppLoading: (microAppLoading) => set(() => ({ microAppLoading })),
});

export { createMicroAppLoadingSlice };
export type { MicroAppLoadingStoreProps };
