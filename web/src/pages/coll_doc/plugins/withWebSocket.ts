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
   * Connect to Socket.
   */

  e.connect = () => {
    if (!e.doc) {
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

    e.doc.on('error', (err) => {
      onError && onError(err);
    });

    e.doc.on('op', (op, source) => {
      if (source) {
        return;
      }
      e.children = type.apply(e.children, op) as Descendant[];
      e.onChange();
    });

    return e;
  };

  e.connect();

  return e;
};

export default withWebSocket;
