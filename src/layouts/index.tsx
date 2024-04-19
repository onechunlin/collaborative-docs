import { Outlet } from 'umi';
import { Layout, Avatar } from 'antd';
import { useLocalUser } from '@/hooks/useLocalUser';
import './index.less';

const { Header, Content } = Layout;

export default function BasicLayout() {
  const user = useLocalUser()
  if (!user) return null

  return (
    <Layout className='basic-layout'>
      <Header className='header'>
        <div
          className='logo-name-container'>
          <img
            className='logo'
            src={require('@/assets/logo.jpg')}
            alt='logo'
            width={36}
          />
          <span className='name'>CollDoc</span>
        </div>
        <Avatar className='avatar' size={36}>
          {user.name}
        </Avatar>
      </Header>
      <Content className='content'><Outlet /></Content>
    </Layout>
  );
}