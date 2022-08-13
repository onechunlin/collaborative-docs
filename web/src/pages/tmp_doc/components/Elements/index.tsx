import { FC } from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';

export const CodeElement: FC<RenderElementProps> = (props) => {
  const { attributes, children } = props;
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

export const DefaultElement: FC<RenderElementProps> = (props) => {
  const { attributes, children } = props;
  return <div {...attributes}>{children}</div>;
};

export const Leaf: FC<RenderLeafProps> = (props) => {
  const { attributes, children, leaf } = props;
  return (
    <span {...attributes} style={{ fontWeight: leaf.bold ? 'bold' : 'normal' }}>
      {children}
    </span>
  );
};
