import { DEFAULT_FONT_COLOR, DEFAULT_FONT_SIZE } from '@/constants';
import { getTextDecoration } from '@/pages/coll_doc/utils/element';
import { CSSProperties, FC } from 'react';
import { RenderLeafProps } from 'slate-react';

/**
 * 叶子节点，即文本节点
 * @param props
 * @returns
 */
const Leaf: FC<RenderLeafProps> = (props) => {
  const { attributes, children, leaf } = props;
  let textStyle: CSSProperties = {
    fontSize: leaf.size || DEFAULT_FONT_SIZE,
    fontWeight: leaf.bold ? 'bold' : 'normal',
    fontStyle: leaf.italic ? 'italic' : 'normal',
    textDecoration: getTextDecoration(leaf),
    color: leaf.color || DEFAULT_FONT_COLOR,
    backgroundColor: leaf.bgColor,
  };

  switch (leaf.textScript) {
    case 'super':
      textStyle = {
        ...textStyle,
        fontSize: 12,
        position: 'relative',
        top: '-0.25em',
        verticalAlign: 'top',
      };
      break;
    case 'sub':
      textStyle = {
        ...textStyle,
        fontSize: 12,
        position: 'relative',
        bottom: '-0.25em',
        verticalAlign: 'bottom',
      };
      break;
    default:
      break;
  }
  return (
    <span {...attributes} style={textStyle}>
      {children}
    </span>
  );
};
export default Leaf;
