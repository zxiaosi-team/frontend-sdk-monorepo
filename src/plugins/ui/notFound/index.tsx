import { theme } from 'antd';

const { useToken } = theme;

/** 404组件 */
const NotFound: React.FC = () => {
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
      }}
    >
      找不到页面
    </div>
  );
};

export default NotFound;
