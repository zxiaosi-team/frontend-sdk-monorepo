import { useState, type CSSProperties } from 'react';

import { sdk } from '@/core';

const styles: Record<string, CSSProperties> = {
  page: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  btn: {
    height: 36,
    padding: '0 60px',
    border: 'none',
    borderRadius: 8,
    background: '#1677ff',
    color: '#fff',
    cursor: 'pointer',
    transition: '0.2s',
  },
};

/** 登录组件 */
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  /** 表单提交成功事件 */
  const handleLogin = async () => {
    if (loading) return;

    setLoading(() => true);
    await new Promise((resolve) => setTimeout(() => resolve(true), 500));
    setLoading(() => false);
    sdk.storage.setItem(sdk.storage.tokenKey, '123456');

    const defaultPath = sdk.app.getRedirectPath();
    sdk.router.navigate(defaultPath, { replace: true });
    await sdk.app.initData?.();
  };

  /** 鼠标移入事件 */
  const handleMouseEnter = (e) => {
    e.currentTarget.style.opacity = '0.75';
  };

  /** 鼠标移出事件 */
  const handleMouseLeave = (e) => {
    e.currentTarget.style.opacity = '1';
  };

  return (
    <div style={styles.page}>
      <h2>欢迎登录系统</h2>

      <button
        style={styles.btn}
        onClick={handleLogin}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {loading ? '登录中...' : '登录'}
      </button>
    </div>
  );
};

export default Login;
