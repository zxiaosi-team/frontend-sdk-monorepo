import { theme } from 'antd';

const { useToken } = theme;

interface Props {
  /** 是否初始化数据的Loading */
  isInitData?: boolean;
}

/** 加载中组件 */
const Loading: React.FC = ({ isInitData = false }: Props) => {
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
