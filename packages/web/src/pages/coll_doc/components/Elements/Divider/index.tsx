import { FC } from 'react';
import { RenderElementProps } from 'slate-react';
import './index.less';

/**
 * 分割线节点
 * @param props
 * @returns
 */
const Divider: FC<RenderElementProps> = (props) => {
  const { attributes, children } = props;

  return (
    <div {...attributes} className='divider-container'>
      <div className='divider-line'>{children}</div>
    </div>
  );
};
export default Divider;
