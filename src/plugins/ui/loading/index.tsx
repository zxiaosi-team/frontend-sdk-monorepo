import './index.css';

interface Props {
  /** 是否是初始化数据 */
  isInitData?: boolean;
  /** 是否是懒加载 */
  isSuspense?: boolean;
  /** 是否是微应用加载 */
  isMicroApp?: boolean;
}

/** 加载中组件 */
const Loading: React.FC = ({
  isInitData = false,
  isSuspense = false,
  isMicroApp = false,
}: Props) => {
  return (
    <div className={`${isInitData ? 'sdk-loading-init' : ''}`}>Loading...</div>
  );
};

export default Loading;
