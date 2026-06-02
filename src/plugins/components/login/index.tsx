import { useState } from 'react';

import type { SDKInstance } from '@/types';

import './index.css';

/** 登录组件 */
const Login: React.FC<{ sdk: SDKInstance }> = ({ sdk }) => {
  const [loading, setLoading] = useState(false);

  /** 表单提交成功事件 */
  const handleFinish = async (e) => {
    if (loading) return;
    e.preventDefault();

    try {
      setLoading(() => true);
      const resp = new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { token: '123456' } });
        }, 1000);
      }) as any;
      setLoading(() => false);

      const token = resp?.data?.token || '';
      if (!token) return;

      sdk.storage.setItem(sdk.storage.tokenKey, token);

      const defaultPath = sdk.app.getRedirectPath();
      sdk.router.navigate(defaultPath, { replace: true });
    } catch (e) {
      console.log('Sdk: Login - handleFinish: ', e);
      setLoading(() => false);
    }
  };

  return (
    <div className='sdk-login'>
      <h2>登录页</h2>
      <form className='sdk-login-form'>
        <button className='sdk-login-form-btn' onClick={handleFinish}>
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
    </div>
  );
};

export default Login;
