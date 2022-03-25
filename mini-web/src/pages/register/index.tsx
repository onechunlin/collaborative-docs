import { useState } from 'react';
import { Input, Form, Button, message } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './index.less';

export default function IndexPage() {
  const history = useHistory();
  const [validate, setValidate] = useState<TValidate>();

  function onFinish(values: TUserInfo) {
    const { password, ...restValues } = values;
    axios.post('/api/user/register', {
      ...restValues,
      password: window.md5(password),
    })
      .then(res => res.data)
      .then((data: TApiResponse) => {
        const { status, errors } = data;

        if (status !== 0) {
          setValidate(errors?.reduce((prev: TValidate, cur: TErrorObject) => {
            const { key, msg } = cur;
            prev[key] = {
              status: 'error',
              msg,
            }
            return prev;
          }, {}));
        } else {
          message.success('注册成功')
          history.push('/login')
        }
      })
      .catch(e => {
        console.error(e);
        message.error('注册出错')
      })
  };

  return (
    <div className="register-container">
      <h2 className='title'>注册用户</h2>
      <Form
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label="用户名"
          name="username"
          validateStatus={validate?.username?.status}
          help={validate?.username?.msg}
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          validateStatus={validate?.confirmPassword?.status}
          help={validate?.confirmPassword?.msg}
          rules={[{ required: true, message: '请确认密码！' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phoneNumber"
          rules={[{ required: true, message: '请输入手机号！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
