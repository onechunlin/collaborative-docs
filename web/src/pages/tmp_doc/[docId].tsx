import { useCallback, useEffect, useState } from 'react';
import { createEditor, Descendant, Node, Operation } from 'slate';
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
import sharedb, { Doc } from 'sharedb/lib/client';
import { useParams } from 'umi';
import ObjectID from 'bson-objectid';
import { type as json1Type } from 'ot-json1';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Socket } from 'sharedb/lib/sharedb';
import { COLL_DOC_COLLECTION } from '@/constants';
import { withOtJson0 } from './plugins/withOtJson0';

const presenceId = new ObjectID().toString();
sharedb.types.register(json1Type);

const defaultValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: '321312',
      },
    ],
  },
];
interface CollDoc {
  title: string;
  content: Descendant[];
}

export default function CollaborativeDoc() {
  const [editor, setEditor] = useState(() =>
    withReact(withHistory(createEditor())),
  );
  console.log(
    '🚀 ~ file: [docId].tsx ~ line 34 ~ CollaborativeDoc ~ editor',
    editor,
  );

  const { docId } = useParams<{ docId: string }>();
  const [docData, setDocData] = useState<CollDoc>();

  useEffect(() => {
    // 拉取文档内容，初始化 websocket 连接
    const socket = new ReconnectingWebSocket(
      `ws://${
        location.port ? location.hostname + ':8080' : location.host + '/ws'
      }?docId=${docId}`,
    );
    const connection = new sharedb.Connection(socket as Socket);
    const doc: Doc<CollDoc> = connection.get(COLL_DOC_COLLECTION, docId);

    doc.subscribe(function (err) {
      if (err) {
        throw err;
      }
      setDocData(doc.data);
      setEditor(withOtJson0(editor, doc));
      // 监听 op 操作，如果不是自身 op 则更新文档
      doc.on('op', function (op, source) {
        // 如果来源是自身的 op 操作，则忽略
        if (source) {
          return;
        }
        const newDocData = json1Type.apply(docData, op) as CollDoc;
        editor.console.log(
          '🚀 ~ file: [docId].tsx ~ line 77 ~ newValue',
          newDocData,
        );
        setDocData(newDocData);
      });
    });
  }, [docId]);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const handleValueChange = (val: Descendant[]) => {
    setDocData({
      title: docData?.title || '',
      content: val,
    });
  };

  if (!docData) {
    return <span>loading</span>;
  }

  return (
    <Slate editor={editor} value={docData.content} onChange={handleValueChange}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          handleKeyDown(editor, event);
        }}
      />
    </Slate>
  );
}
