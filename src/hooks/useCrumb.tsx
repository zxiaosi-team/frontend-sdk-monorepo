import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { sdk } from '@/core';

/**
 * 获取面包屑
 * @see https://reactrouter.com/6.30.3/hooks/use-matches
 */
const useCrumb = () => {
  const location = useLocation();

  let matches = useMemo(() => sdk.client.matches, [location]);

  let crumbs = matches
    // @ts-ignore
    .filter((match) => Boolean(match.handle?.crumb))
    // @ts-ignore
    .map((match) => match.handle.crumb(match.data));

  return crumbs;
};

export { useCrumb };
