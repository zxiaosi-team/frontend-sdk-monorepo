/**
 * 404页面
 * - 需要注册 navigate 实例，用于跳转页面
 */
const NotFound: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      找不到页面
    </div>
  );
};

export default NotFound;
