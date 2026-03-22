import { cloneDeep } from 'es-toolkit/object';
import { useMemo } from 'react';
import { useStore } from 'zustand';

import { sdk } from '@/core';

/**
 * React Intl Universal
 * - 如果项目不使用 React Compiler, 可以直接使用 sdk.i18n.intl
 * - 不要解构使用, const { get } = useIntl() 会报错
 * @example const intl = useIntl(); intl.get(key).d(defaultValue)
 */
const useIntl = () => {
  const locale = useStore(sdk.store, (state) => state.locale);
  const intl = useMemo(() => cloneDeep(sdk.i18n.intl), [locale]);
  return intl;
};

export { useIntl };
