/**
 * 处理 websocket 连接的插件，通过 websocket 链接 sharedb 的服务器，
 * 获取文档信息，进行 ot 操作
 */

import ReconnectingWebSocket from 'reconnecting-websocket';
import { Doc } from 'sharedb';
import sharedb, { Error } from 'sharedb/lib/client';
import { Socket } from 'sharedb/lib/sharedb';
import { Descendant, Editor } from 'slate';
import { type as json1Type, JSONOp, type } from 'ot-json1';

export interface WebSocketEditor {
  doc: Doc;
  connect: () => void;
  disconnect: () => void;
  send: (op: JSONOp) => void;
  receive: (op: JSONOp) => void;
  destroy: () => void;
}

export interface WebSocketPluginOptions {
  url: string;
  docOptions: {
    collectionName: string;
    docId: string;
  };
  onConnect?: (doc: Doc) => void;
  onDisconnect?: () => void;
  onError?: (msg: Error) => void;
}

export const withWebSocket = (e: Editor, options: WebSocketPluginOptions) => {
  const { onConnect, onError, url, docOptions } = options;
  const { collectionName, docId } = docOptions;

  /**
   * 连接 websocket 服务器
   */

  e.connect = () => {
    if (!e.doc) {
      // 创建 websocket 连接，并注册文档信息（在线状态，内容等）
      sharedb.types.register(json1Type);
      const socket = new ReconnectingWebSocket(url);
      const connection = new sharedb.Connection(socket as Socket);
      const doc = connection.get(collectionName, docId);
      doc.subscribe(function (err) {
        if (err) {
          onError && onError(err);
          return;
        }
        onConnect && onConnect(doc);
      });
      e.doc = doc;
    }

    // 错误回调
    e.doc.on('error', (err) => {
      onError && onError(err);
    });

    // 接收到 op 操作时的回调
    e.doc.on('op', (op, source) => {
      // 如果是自己发出的则忽略
      if (source) {
        return;
      }
      // 否则将该 op 操作作用到当前文档副本上
      e.children = type.apply(e.children, op) as Descendant[];
      // 注意这里是为了视图更新，踩过坑，查了挺久发现需要手动调用
      e.onChange();
    });

    return e;
  };

  e.connect();

  return e;
};

export default withWebSocket;
