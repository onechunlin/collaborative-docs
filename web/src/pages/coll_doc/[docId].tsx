import { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';
import { withHistory } from 'slate-history';
import { DefaultElement, Link, Leaf, Paragraph } from './components/Elements';
import { handleKeyDown } from './utils/handler';
import { Doc } from 'sharedb/lib/client';
import { useParams } from 'umi';
import { COLL_DOC_COLLECTION } from '@/constants';
import HoveringToolbar from './components/HoveringToolbar';
import { WebSocketPluginOptions } from './plugins/withWebSocket';
import withIOCollaboration from './plugins/withIOCollaboration';
import { Input, Spin } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { collDocInfoDetail, updateTitle } from '@/services/collDoc';
import Divider from './components/Elements/Divider';
import useCursor from './hooks/useCursor';

import './index.less';
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
  const [contentLoading, setContentLoading] = useState<boolean>(true);
  const [value, setValue] = useState<Descendant[]>(defaultValue);
  const [title, setTitle] = useState<string>();

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
        setContentLoading(false);
      },
    };

    return withIOCollaboration(slateEditor, options);
  }, []);

  const decorate = useCursor(editor);

  // 拉取文档基本信息
  const { loading: basicInfoLoading } = useRequest(
    async () => {
      const res = await collDocInfoDetail(docId);
      setTitle(res.title);
      return res.title;
    },
    {
      refreshOnWindowFocus: true,
    },
  );

  // 更新文档标题
  const { run: updateTitleFn } = useRequest(
    async () => {
      await updateTitle(docId, title);
    },
    {
      refreshDeps: [docId, title],
      debounceWait: 1000,
      manual: true,
    },
  );

  function handlerTitleChange(val: string): void {
    setTitle(val);
    updateTitleFn();
  }

  // 决定如何渲染元素节点
  const renderElement = useCallback((props: RenderElementProps) => {
    const { element } = props;
    switch (element.type) {
      case 'link':
        return <Link {...props} />;
      case 'divider':
        return <Divider {...props} />;
      case 'paragraph':
        return <Paragraph {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // 决定如何渲染叶子节点（文本节点）
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => {
      return <Leaf {...props} />;
    },
    [decorate],
  );

  // 拉取内容和文档基本信息中
  if (contentLoading || basicInfoLoading) {
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
      <Input
        className='title-input'
        autoFocus
        value={title}
        onChange={handlerTitleChange}
        placeholder='请输入标题'
      />
      <Slate editor={editor} value={value} onChange={setValue}>
        <HoveringToolbar />
        <Editable
          className='editor'
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            handleKeyDown(editor, event);
          }}
          placeholder='请输入正文'
          decorate={decorate}
        />
      </Slate>
    </div>
  );
}
