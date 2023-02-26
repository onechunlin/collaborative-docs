import { Message, Form, Input, Button } from '@arco-design/web-react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import { register } from '@/services';
import './index.less';

type TFormData = {
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number;
};

const { Item: FormItem, useForm } = Form;
const { Password } = Input;

export default function Register() {
  const history = useHistory();
  const [form] = useForm();

  async function handleRegister() {
    try {
      await form.validate();

      const {
        username,
        password,
        phoneNumber,
      } = form.getFieldsValue() as TFormData;
      await register({ username, password, phoneNumber });
      Message.success('注册成功');
      history.push('/login');
    } catch (e: any) {
      console.error(e);
      Message.error(e?.message || '注册出错');
    }
  }

  return (
    <div className="container">
      <div className="register-container">
        <div className="title text-center">注册</div>
        <Form
          form={form}
          layout="vertical"
          onSubmit={handleRegister}
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

          <FormItem
            label="确认密码"
            field="confirmPassword"
            rules={[
              {
                required: true,
                message: '请输入确认密码',
              },
              {
                validator: (value, errCallback) => {
                  const password = form.getFieldValue('password');
                  if (password !== value) {
                    errCallback('两次密码不相等');
                  }
                },
                validateTrigger: 'onBlur',
              },
            ]}
          >
            <Password placeholder="请输入" autoComplete="off" />
          </FormItem>

          <FormItem
            label="手机号码"
            field="phoneNumber"
            rules={[
              {
                required: true,
                message: '请输入手机号码',
              },
              {
                validator: (value, errCallback) => {
                  if (!validator.isMobilePhone(value || '', 'zh-CN')) {
                    errCallback('请输入正确的手机号码');
                  }
                },
                validateTrigger: 'onBlur',
              },
            ]}
          >
            <Input placeholder="请输入" autoComplete="off" />
          </FormItem>

          <FormItem className="text-right">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}
