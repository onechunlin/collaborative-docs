import { Layout, Menu } from '@arco-design/web-react';
import { IconHome } from '@arco-design/web-react/icon';
import { PropsWithChildren } from 'react';
import { useHistory } from 'react-router-dom';
import './index.less';

const { Sider, Content } = Layout;
const { Item: MenuItem } = Menu;

export default function SiderLayout(props: PropsWithChildren<any>) {
  const { children } = props;
  const history = useHistory();

  const handleMenuClick = (key: string) => {
    history.push(key);
  };

  return (
    <Layout className='sider-layout'>
      <Sider className='sider'>
        <div className='logo-name-container'>
          <img
            className='logo'
            src={require('@/assets/logo.png')}
            alt='logo'
            width={36}
          />
          <span className='name'>Small Docs</span>
        </div>
        <Menu
          className='menu-list'
          defaultSelectedKeys={['/home']}
          onClickMenuItem={handleMenuClick}>
          <MenuItem key='/home' className='menu-item'>
            <IconHome />
            主页
          </MenuItem>
          {/* <MenuItem key="/home/fav" className="menu-item">
            <IconStar />
            收藏
          </MenuItem> */}
        </Menu>
      </Sider>
      <Content className='content'>{children}</Content>
    </Layout>
  );
}
