import { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

const Portal: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export default Portal;
