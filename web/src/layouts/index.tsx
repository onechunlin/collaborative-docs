import React from 'react';
import { useLocation } from 'react-router-dom';
import BasicLayout from './BasicLayout';
import SiderLayout from './SiderLayout';

function Layout(props: React.PropsWithChildren<any>) {
  const location = useLocation();
  if (location.pathname.startsWith('/home')) {
    return <SiderLayout>{props.children}</SiderLayout>;
  }

  return <BasicLayout>{props.children}</BasicLayout>;
}

export default Layout;
