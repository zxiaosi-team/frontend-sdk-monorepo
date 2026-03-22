import { sdk } from '@/core';

/**
 * 判断权限code是否在当前用户权限列表中
 * @param code 权限code
 */
export const isPermissionUtil = (code: string) => {
  return sdk.app.permissions?.includes?.(code);
};
