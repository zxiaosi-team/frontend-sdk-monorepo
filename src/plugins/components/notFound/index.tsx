import type { SDKInstance } from '@/types';

import './index.css';

/** 404组件 */
const NotFound: React.FC<{ sdk: SDKInstance }> = ({ sdk }) => {
  return <div className='sdk-notfound'>找不到页面</div>;
};

export default NotFound;
