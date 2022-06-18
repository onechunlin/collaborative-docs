import React from 'react';
import { useLocation } from 'react-router-dom';
import BasicLayout from './BasicLayout';
import SiderLayout from './SiderLayout';

function Layout(props: React.PropsWithChildren<any>) {
  const location = useLocation();
  if (location.pathname.startsWith('/home')) {
    return <SiderLayout>{props.children}</SiderLayout>;
  } else if (location.pathname.startsWith('/md_edit')) {
    return props.children;
  }

  return <BasicLayout>{props.children}</BasicLayout>;
}

export default Layout;
