import { useState, useReducer } from 'react';
import { Input, Form, Button, message } from 'antd';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import './index.less';

type LoginData = {
  username: string;
  password: string;
}

export default function Login() {
  const history = useHistory();
  const [validate, setValidate] = useState<TValidate>();

  function onFinish(values: LoginData) {
    const { username, password } = values;
    axios.post('/api/user/login', {
      username,
      password: window.md5(password),
    })
      .then(res => res.data)
      .then((data: TApiResponse) => {
        const { status, data: resData, errors } = data;
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
          const { userInfo } = resData;
          window.userInfo = userInfo;
          history.push('/dashboard')
        }
      })
      .catch(e => {
        console.error(e);
        message.error('登录出错')
      })
  };

  return (
    <div className="login-container">
      <div className="logo-and-name">
        <img src={require('@/assets/logo.png')} alt="logo" width={24} height={24} />
        <span className='name'>云文档</span>
      </div>
      <h2 className='title text-center'>登录</h2>
      <Form
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item
          label={<span className='sub-text'>用户名</span>}
          name="username"
          validateStatus={validate?.username?.status}
          help={validate?.username?.msg}
          required={false}
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label={<span className='sub-text'>密码</span>}
          name="password"
          validateStatus={validate?.password?.status}
          help={validate?.password?.msg}
          required={false}
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password autoComplete="off" />
        </Form.Item>

        <Form.Item className='text-right'>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      <p className='desc text-right'>还没有帐号？<Link to='/register'>去注册</Link></p>
    </div>
  );
}
