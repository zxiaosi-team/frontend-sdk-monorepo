import { useState } from 'react';

import { sdk } from '@/core';

import './index.css';

/** 登录组件 */
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');

  /** 表单提交成功事件 */
  const handleFinish = async (e) => {
    if (loading) return;
    e.preventDefault();

    try {
      setLoading(() => true);
      const resp = await sdk.api.loginApi({ userName: username, password });
      setLoading(() => false);

      const token = resp?.data?.token || '';
      if (!token) return;

      sdk.storage.setToken(token);
      const defaultPath = sdk.app.getRedirectPath();

      if (sdk.config.qiankunMode === 'load') {
        sdk.client.navigate(defaultPath, { replace: true });
        sdk.app.initData?.();
      } else {
        window.location.replace(defaultPath);
      }
    } catch (e) {
      console.log('Sdk: Login - handleFinish: ', e);
      setLoading(() => false);
    }
  };

  return (
    <div className='sdk-login'>
      <form className='sdk-login-form'>
        <div className='sdk-login-form-group'>
          <label>用 户 名</label>
          <div className='sdk-login-form-group-input'>
            <input
              type='text'
              value={username}
              placeholder='your@email.com 或 昵称'
              onChange={(e) => setUsername(e.target.value)}
            />
            <div>{username ? '' : '请输入用户名'}</div>
          </div>
        </div>

        <div className='sdk-login-form-group'>
          <label>密 码</label>
          <div className='sdk-login-form-group-input'>
            <input
              type='password'
              value={password}
              placeholder='请输入密码'
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>{password ? '' : '请输入密码'}</div>
          </div>
        </div>

        <button className='sdk-login-form-btn' onClick={handleFinish}>
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
    </div>
  );
};

export default Login;
