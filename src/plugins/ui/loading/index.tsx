import { theme } from 'antd';

const { useToken } = theme;

interface Props {
  /** 是否是初始化数据 */
  isInitData?: boolean;
  /** 是否是懒加载 */
  isSuspense?: boolean;
  /** 是否是子应用加载 */
  isMicroApp?: boolean;
}

/** 加载中组件 */
const Loading: React.FC = ({
  isInitData = false,
  isSuspense = false,
  isMicroApp = false,
}: Props) => {
  const { token } = useToken();
  return (
    <div
      style={
        isInitData
          ? {
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: token.colorBgContainer,
              color: token.colorText,
            }
          : {}
      }
    >
      Loading...
    </div>
  );
};

export default Loading;
