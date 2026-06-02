import type { SDKInstance } from '@/types';

import './index.css';

interface Props {
  /** sdk */
  sdk: SDKInstance;
  /** 是否是初始化数据 */
  isInitData?: boolean;
  /** 是否是懒加载 */
  isSuspense?: boolean;
  /** 是否是微应用加载 */
  isMicroApp?: boolean;
}

/** 加载中组件 */
const Loading: React.FC<Props> = ({
  sdk,
  isInitData = false,
  isSuspense = false,
  isMicroApp = false,
}) => {
  return (
    <div className={`${isInitData ? 'sdk-loading-init' : ''}`}>Loading...</div>
  );
};

export default Loading;
