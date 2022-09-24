import { ParagraphElement } from '@/pages/coll_doc/typings';
import { FC } from 'react';
import { RenderElementProps } from 'slate-react';

/**
 * 段落节点
 * @param props
 * @returns
 */
const Paragraph: FC<RenderElementProps> = (props) => {
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

export default Paragraph;
