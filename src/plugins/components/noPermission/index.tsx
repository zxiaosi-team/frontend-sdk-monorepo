import type { SDKInstance } from '@/types';

/** 无权限组件 */
const NoPermission: React.FC<{ sdk: SDKInstance }> = ({ sdk }) => {
  return <div>无权限</div>;
};

export default NoPermission;
