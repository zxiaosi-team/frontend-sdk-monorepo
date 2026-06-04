import { useState } from 'react';

import './index.css';
import { sdk } from '@/core';

/** 登录组件 */
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  /** 表单提交成功事件 */
  const handleFinish = async (e) => {
    if (loading) return;
    e.preventDefault();

    setLoading(() => true);
    // 睡眠1s
    await new Promise((resolve) => setTimeout(() => resolve(true), 500));
    setLoading(() => false);
    sdk.storage.setItem(sdk.storage.tokenKey, '123456');

    const defaultPath = sdk.app.getRedirectPath();
    sdk.router.navigate(defaultPath, { replace: true });
    await sdk.app.initData?.();
  };

  return (
    <div className='sdk-login'>
      <h2>登录页</h2>

      <button className='sdk-login-btn' onClick={handleFinish}>
        {loading ? '登录中...' : '登录'}
      </button>
    </div>
  );
};

export default Login;
