import { theme } from 'antd';

const { useToken } = theme;

/** 加载中组件 */
const Loading: React.FC = () => {
  const { token } = useToken();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: token.colorBgContainer,
        color: token.colorText,
      }}
    >
      Loading...
    </div>
  );
};

export default Loading;
