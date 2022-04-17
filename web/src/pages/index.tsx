import { Result, Button } from '@arco-design/web-react';
import { IconFaceSmileFill } from '@arco-design/web-react/icon';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();

  return (
    <Result
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      status={null}
      icon={<IconFaceSmileFill style={{ color: 'rgb(var(--arcoblue-6))' }} />}
      title="欢迎使用 Small Docs"
      extra={
        <Button type="primary" onClick={() => history.push('/login')}>
          去登录
        </Button>
      }
    ></Result>
  );
}
