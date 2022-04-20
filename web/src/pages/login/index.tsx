import { Message, Form, Input, Button } from '@arco-design/web-react';
import { Link } from 'react-router-dom';
import { login } from '@/services';
import './index.less';

type TFormData = {
  username: string;
  password: string;
};

const { Item: FormItem, useForm } = Form;
const { Password } = Input;

export default function Login() {
  const [form] = useForm();

  async function handleLogin() {
    try {
      await form.validate();

      const { username, password } = form.getFieldsValue() as TFormData;
      await login({
        username,
        password,
      });
      Message.success('登录成功');
      location.href='/home';
    } catch (e: any) {
      console.error(e);
      Message.error(e?.message || '登录出错');
    }
  }

  return (
    <div className="container">
      <div className="login-container">
        <div className="title text-center">登录</div>
        <Form
          form={form}
          layout="vertical"
          onSubmit={handleLogin}
          style={{ width: 400 }}
        >
          <FormItem
            label="用户名"
            field="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input placeholder="请输入" autoComplete="off" />
          </FormItem>

          <FormItem
            label="密码"
            field="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Password placeholder="请输入" autoComplete="off" />
          </FormItem>

          <FormItem className="text-right" style={{ marginBottom: 8 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>

          <p className="desc text-right">
            没有帐号？
            <Link to="/register" className="link">
              去注册
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
