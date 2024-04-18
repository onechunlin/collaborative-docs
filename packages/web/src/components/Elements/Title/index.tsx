import { FC } from 'react';
import { RenderElementProps } from 'slate-react';


const Title: FC<RenderElementProps> = (props) => {
  const { attributes, children } = props;

  return (
    <h1 {...attributes}>
      {children}
    </h1>
  );
};

export default Title;
