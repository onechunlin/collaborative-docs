import { getTextDecoration } from '@/utils/element';
import classNames from 'classnames';
import { CSSProperties, FC } from 'react';
import { RenderLeafProps } from 'slate-react';
import Caret from './Caret';
import './index.less';

/**
 * 叶子节点，即文本节点
 * @param props
 * @returns
 */
const Leaf: FC<RenderLeafProps> = (props) => {
  const { attributes, children, leaf } = props;
  let textStyle: CSSProperties = {
    fontSize: leaf.size,
    fontWeight: leaf.bold ? 'bold' : 'normal',
    fontStyle: leaf.italic ? 'italic' : 'normal',
    textDecoration: getTextDecoration(leaf),
    color: leaf.color,
    backgroundColor: leaf.bgColor,
  };

  const { textScript, cursorColor, name, isForward } = leaf;

  switch (textScript) {
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
  if (cursorColor) {
    textStyle = {
      ...textStyle,
      backgroundColor: cursorColor.slice(0, -2) + '0.2)',
      position: 'relative',
    };
  }

  return (
    <span
      {...attributes}
      style={textStyle}
      className={classNames({
        'inline-code': leaf.code,
      })}
    >
      {children}
      {cursorColor && name && (
        <Caret color={cursorColor} name={name} isForward={!!isForward} />
      )}
    </span>
  );
};
export default Leaf;
