import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createEditor, Descendant, Transforms } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';
import { withHistory } from 'slate-history';
import { CodeElement, DefaultElement, Leaf } from './components/Elements';
import { handleKeyDown } from './utils/handler';
import { Doc } from 'sharedb/lib/client';
import { useParams } from 'umi';
import { type, Doc as JsonDoc } from 'ot-json1';
import { COLL_DOC_COLLECTION } from '@/constants';
import './index.less';
import HoveringToolbar from './components/HoveringToolbar';
import { WebSocketPluginOptions } from './plugins/withWebSocket';
import withIOCollaboration from './plugins/withIOCollaboration';
import { Spin } from '@arco-design/web-react';

interface CollDoc {
  title: string;
  content: Descendant[];
}

const defaultValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

export default function CollaborativeDoc() {
  const { docId } = useParams<{ docId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState<Descendant[]>(defaultValue);

  const editor = useMemo(() => {
    const slateEditor = withReact(withHistory(createEditor()));

    const host =
      process.env.NODE_ENV === 'production'
        ? `${window.location.host}/ws`
        : 'localhost:8080';

    const options: WebSocketPluginOptions = {
      url: `ws://${host}?docId=${docId}`,
      docOptions: {
        collectionName: COLL_DOC_COLLECTION,
        docId,
      },
      onConnect: (docData: Doc<Descendant[]>) => {
        setValue(docData.data);
        setLoading(false);
      },
    };

    return withIOCollaboration(slateEditor, options);
  }, []);

  const renderElement = useCallback((props: RenderElementProps) => {
    const { attributes, children, element } = props;
    switch (element.type) {
      case 'code':
        return <CodeElement {...props} />;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;

      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  if (loading) {
    return (
      <Spin
        loading
        block
        tip='文档内容拉取中，请稍后...'
        className='loading-bar'
      />
    );
  }

  return (
    <div id='coll-doc-container'>
      <button
        onClick={() => {
          // setDocData({
          //   ...docData,
          //   content: [
          //     {
          //       type: 'paragraph',
          //       children: [{ text: 'xxx' }],
          //     },
          //   ],
          // });
        }}>
        点击
      </button>
      <Slate editor={editor} value={value} onChange={setValue}>
        <HoveringToolbar />
        <Editable
          className='editor'
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            handleKeyDown(editor, event);
          }}
        />
      </Slate>
    </div>
  );
}
