import { DefaultElement, Leaf, Link, Paragraph } from '@/components/Elements';
import Divider from '@/components/Elements/Divider';
import HoveringToolbar from '@/components/HoveringToolbar';
import { handleKeyDown } from '@/utils/handler';
import { useCallback, useMemo, useState } from 'react';
import { Descendant, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react';
import { useParams } from 'umi';

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
  console.log('🚀 ~ CollaborativeDoc ~ value:', value);
  const [title, setTitle] = useState<string>();

  const editor = useMemo(() => {
    // websocket 的 host
    const host =
      process.env.NODE_ENV === 'production'
        ? `${window.location.host}/ws`
        : 'localhost:8080';

    /**
     * 连接 socket 服务器时的参数和回调，会根据传入的文档 ID
     * 和文档 collection（集合，类似关系型数据库的表）名称拉
     * 取文档信息，设置连接成功后的回调更新视图
     */
    // const options: WebSocketPluginOptions = {
    //   url: `ws://${host}?docId=${docId}`,
    //   docOptions: {
    //     collectionName: COLL_DOC_COLLECTION,
    //     docId,
    //   },
    //   onConnect: (docData: Doc<Descendant[]>) => {
    //     setValue(docData.data);
    //     setContentLoading(false);
    //   },
    // };

    return withReact(withHistory(createEditor()));
    // return withIOCollaboration(withReact(withHistory(createEditor())), options);
  }, []);

  // 文档装饰信息，会体现在文档的数据上，但是不会改变底层数据（不会产生 op 操作）
  // const decorate = useCursor(editor);

  // 拉取文档基本信息
  // const { loading: basicInfoLoading } = useRequest(
  //   async () => {
  //     // 文档基本信息和具体内容目前分表存储，文档标题暂时不做协同
  //     const res = await collDocInfoDetail(docId);
  //     setTitle(res.title);
  //     return res.title;
  //   },
  //   {
  //     // 视图聚焦时刷新
  //     refreshOnWindowFocus: true,
  //   },
  // );

  // // 更新文档标题
  // const { run: updateTitleFn } = useRequest(
  //   async () => {
  //     await updateTitle(docId, title);
  //   },
  //   {
  //     refreshDeps: [docId, title],
  //     debounceWait: 1000,
  //     manual: true,
  //   },
  // );

  // function handlerTitleChange(val: string): void {
  //   setTitle(val);
  //   updateTitleFn();
  // }

  // 决定如何渲染元素 Element 节点
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
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div id="coll-doc-container">
      {/* <Input
        className="title-input"
        autoFocus
        value={title}
        onChange={handlerTitleChange}
        placeholder="请输入标题"
      /> */}
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <HoveringToolbar />
        <Editable
          className="editor"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            handleKeyDown(editor, event);
          }}
          placeholder="请输入正文"
          // decorate={decorate}
        />
      </Slate>
    </div>
  );
}
