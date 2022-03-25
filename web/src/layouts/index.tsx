import { useLocation } from 'react-router-dom';
import BasicLayout from './BasicLayout';
import SiderLayout from './SiderLayout';

export default function (props: any) {
    const location = useLocation();
    if (location.pathname === '/login') {
        return <BasicLayout>{props.children}</BasicLayout>
    }

    return (
        <SiderLayout>
            {props.children}
        </ SiderLayout>
    );
}