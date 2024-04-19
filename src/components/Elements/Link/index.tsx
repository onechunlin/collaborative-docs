import { FC } from 'react';
import { RenderElementProps } from 'slate-react';
import { LinkElement } from '../../../typings/editor';

import './index.less';


/**
 * 链接节点
 * @param props
 * @returns
 */
const Link: FC<RenderElementProps> = (props) => {
  const { attributes, children, element } = props;
  const linkElement = element as LinkElement;

  return (
    <a
    {...attributes}
    href={linkElement.url}
    target='_blank'
    title={linkElement.url}
    // 这里需要用 onClick 来进行链接的打开，Slate 官方例子也打不开新的链接
    onClick={() => {
      window.open(linkElement.url);
    }}
    rel='noreferrer'>
    {children}
  </a>
  );
};

export default Link;
