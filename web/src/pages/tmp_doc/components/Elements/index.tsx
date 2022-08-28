import { FC } from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';

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
  return (
    <span
      {...attributes}
      style={{
        fontWeight: leaf.bold ? 'bold' : 'normal',
        fontStyle: leaf.italic ? 'italic' : 'normal',
        textDecoration: leaf.underline ? 'underline' : 'none',
      }}>
      {children}
    </span>
  );
};
