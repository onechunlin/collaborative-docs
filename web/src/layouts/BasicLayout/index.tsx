import { Layout, Avatar } from '@arco-design/web-react';
import { useHistory } from 'react-router-dom';
import './index.less';

const { Header, Content } = Layout;

export default function BasicLayout(props: any) {
  const { children } = props;
  const history = useHistory();

  const showAvatar = !['/login', '/register', '/'].includes(location.pathname);
  return (
    <Layout className="basic-layout">
      <Header className="header">
        <div className="logo-name-container" onClick={() => history.push('/')}>
          <img
            className="logo"
            src={require('@/assets/logo.png')}
            alt="logo"
            width={36}
          />
          <span className="name">Small Docs</span>
        </div>
        {showAvatar && (
          <Avatar className="avatar" size={36}>
            <img src={window.userInfo?.avatar} alt="avatar" />
          </Avatar>
        )}
      </Header>
      <Content className="content">{children}</Content>
    </Layout>
  );
}
