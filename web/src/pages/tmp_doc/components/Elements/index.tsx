import { DEFAULT_FONT_COLOR, DEFAULT_FONT_SIZE } from '@/constants';
import { CSSProperties, FC } from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { ParagraphElement } from '../../typings';
import { getTextDecoration } from '../../utils/element';

/**
 * 段落节点
 * @param props
 * @returns
 */
export const Paragraph: FC<RenderElementProps> = (props) => {
  const { attributes, children, element } = props;

  return (
    <p
      {...attributes}
      style={{
        marginBottom: 6,
        textAlign: (element as ParagraphElement).textAlign,
      }}>
      {children}
    </p>
  );
};

/**
 * 代码块节点
 * @param props
 * @returns
 */
export const CodeElement: FC<RenderElementProps> = (props) => {
  const { attributes, children } = props;
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

/**
 * 默认中间节点（非 editor 和 text 节点）渲染
 * @param props
 * @returns
 */
export const DefaultElement: FC<RenderElementProps> = (props) => {
  const { attributes, children } = props;
  return <div {...attributes}>{children}</div>;
};

/**
 * 叶子节点，即文本节点
 * @param props
 * @returns
 */
export const Leaf: FC<RenderLeafProps> = (props) => {
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
