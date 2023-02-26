import { FC } from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * 默认中间节点（非 editor 和 text 节点）渲染
 * @param props
 * @returns
 */
const DefaultElement: FC<RenderElementProps> = (props) => {
  const { attributes, children } = props;
  return <div {...attributes}>{children}</div>;
};

export default DefaultElement;
