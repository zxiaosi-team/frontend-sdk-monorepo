import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { sdk } from '@/core';

/**
 * 判断是否有权限
 * @param code 权限code (默认为当前路由)
 */
const usePermission = (code?: string) => {
  const location = useLocation(); // 只能获取 应用内部路由（无 router base）

  const isAuth = useMemo(() => {
    const permission = code || sdk.router.location.pathname;
    return sdk.app.permissions?.includes?.(permission);
  }, [location.pathname, code]);

  return isAuth;
};

export { usePermission };
