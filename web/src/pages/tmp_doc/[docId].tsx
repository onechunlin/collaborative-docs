import { useCallback, useEffect, useState } from 'react';
import {
  createEditor,
  Descendant,
  Editor,
  Node,
  Operation,
  Transforms,
} from 'slate';
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
import { getJsonOpFromSlate, getSlateOpFromJson } from './utils/ot';
import { Spin } from '@arco-design/web-react';
import './index.less';

sharedb.types.register(json1Type);

interface CollDoc {
  title: string;
  content: Descendant[];
}

export default function CollaborativeDoc() {
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  console.log(
    '🚀 ~ file: [docId].tsx ~ line 33 ~ CollaborativeDoc ~ editor',
    editor,
  );

  const { docId } = useParams<{ docId: string }>();
  const [doc, setDoc] = useState<Doc<CollDoc>>();

  const [docData, setDocData] = useState<CollDoc>();
  editor.children = docData?.content || [];

  useEffect(() => {
    // 拉取文档内容，初始化 websocket 连接
    const socket = new ReconnectingWebSocket(
      `ws://${
        location.port ? location.hostname + ':8080' : location.host + '/ws'
      }?docId=${docId}`,
    );
    const connection = new sharedb.Connection(socket as Socket);
    const curDoc: Doc<CollDoc> = connection.get(COLL_DOC_COLLECTION, docId);

    curDoc.subscribe(function (err) {
      if (err) {
        throw err;
      }
      setDoc(curDoc);
      setDocData(curDoc.data);
      console.log('🚀 ~ file: [docId].tsx ~ line 56 ~ doc.data', curDoc.data);

      // 监听 op 操作，如果不是自身 op 则更新文档
      curDoc.on('op', function (op, source) {
        // 如果来源是自身的 op 操作，则忽略
        if (source) {
          return;
        }
        console.log('🚀 ~ file: [docId].tsx ~ line 71 ~ op', op);

        const newDocData = json1Type.apply(docData, op) as CollDoc;
        setDocData(newDocData);
      });
    });
  }, [docId]);

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

  const handleValueChange = (val: Descendant[]) => {
    setDocData({
      title: docData?.title || '',
      content: val,
    });
    if (!doc) {
      return;
    }
    // operations.forEach((operation) => {
    //   const jsonOp = getJsonOpFromSlate(operation);
    //   if (jsonOp) {
    //     doc.submitOp(jsonOp);
    //   }
    // });
  };

  if (!docData) {
    return (
      <Spin
        loading
        block
        tip="文档内容拉取中，请稍后..."
        className="loading-bar"
      />
    );
  }

  return (
    <div id="coll-doc-container">
      <button
        onClick={() => {
          Transforms.insertNodes(
            editor,
            [
              {
                type: 'code',
                children: [
                  {
                    text: 'test',
                  },
                ],
              },
            ],
            {
              hanging: true,
            },
          );
        }}
      >
        点击
      </button>
      <Slate
        editor={editor}
        value={docData.content}
        onChange={handleValueChange}
      >
        <Editable
          className="editor"
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
