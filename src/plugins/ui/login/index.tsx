import { sdk } from '@/core';
import { Button, Flex, Form, type FormProps, Input, theme } from 'antd';
import { useState } from 'react';

const { useToken } = theme;

/** 登录组件 */
const Login: React.FC = () => {
  const { token: themeToken } = useToken();

  const [loading, setLoading] = useState(false);

  /** 表单提交成功事件 */
  const handleFinish: FormProps['onFinish'] = async (values) => {
    try {
      setLoading(() => true);
      const resp = await sdk.api.request('/login', {
        method: 'POST',
        data: values,
      });
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
      console.log('Login handleFinish: ', e);
      setLoading(() => false);
    }
  };

  return (
    <Flex
      style={{
        width: '100%',
        height: '100%',
        background: themeToken.colorBgContainer,
      }}
      justify={'center'}
      align={'center'}
    >
      <Form
        labelCol={{ span: 8 }}
        labelAlign="left"
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item noStyle>
          <Button block type="primary" htmlType="submit" loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
