/**
 * 插件的协同使用，注意插件间的依赖关系
 */
import { COLL_DOC_COLLECTION } from '@/constants';
import { Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import withInline from './withInline';
import withOtJson1 from './withOtJson1';
import withVoid from './withVoid';
import withWebSocket, { WebSocketPluginOptions } from './withWebSocket';

/**
 * 连接 socket 服务器时的参数和回调，会根据传入的文档 ID
 * 和文档 collection（集合，类似关系型数据库的表）名称拉
 * 取文档信息，设置连接成功后的回调更新视图
 */
const withCollaboration = (e: Editor, docId: string) => {
  const options: WebSocketPluginOptions = {
    url: `ws://localhost:8080?docId=${docId}`,
    docOptions: {
      collectionName: COLL_DOC_COLLECTION,
      docId,
    },
    onConnect: (docData) => {
      console.log('🚀 ~ withIOCollaboration ~ docData:', docData);
    },
  };

  const baseEditor = withVoid(withInline(withReact(withHistory(e))));
  return withOtJson1(withWebSocket(baseEditor, options));
};

export default withCollaboration;
