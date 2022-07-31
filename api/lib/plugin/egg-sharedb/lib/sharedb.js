'use strict';

const ShareDB = require('sharedb');
const WebSocket = require('ws');
const richText = require('rich-text');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const sharedbMongo = require('sharedb-mongo');
const parseUrl = require('url').parse;
const qs = require('qs');


module.exports = app => {
  const sharedbDoc = initServer(app);
  app.sharedbDoc = sharedbDoc;
};

function initServer(app) {
  // 注册富文本类型
  ShareDB.types.register(richText.type);
  // 创建 sharedb 实例
  const { url: dbUrl, options: dbOptions } = app.config.sharedb.options.db;
  const db = sharedbMongo(dbUrl, dbOptions);
  const backend = new ShareDB({
    ...app.config.sharedb.options,
    db,
  });
  const sharedbDoc = startServer(backend, app);

  return sharedbDoc;
}

function startServer(backend, app) {
  const { options, port } = app.config.sharedb;
  const { collection: dbCollection } = options.db;

  // todo 这是干啥的
  const connection = backend.connect();

  // 创建 websocket 服务器
  const wss = new WebSocket.Server({ port }, () => {
    console.log(`websocket server listening on http://localhost:${port}`);
  });

  // 监听 connection 事件
  wss.on('connection', function(ws, request) {
    const query = parseUrl(request.url).query;
    const docId = qs.parse(query).docId;
    // 获取对应集合 ID 的文档
    const doc = connection.get(dbCollection, docId);
    // 获取 doc 的数据
    doc.fetch(function(err) {
      if (err) throw err;
      // // 如果该记录不存在的话
      // if (doc.type === null) {
      //   doc.create([{insert: ''}], richText.type.name);
      //   return;
      // }
    });

    // 将 websocket 的包打成 JSON 流
    const stream = new WebSocketJSONStream(ws);

    // 监听 stream 的错误、结束和关闭
    stream.on('error', error => {
      console.log('server stream error, the message is ', error.message);
    });
    stream.on('end', () => console.log('server stream end'));
    stream.on('close', () => console.log('server stream close'));

    backend.listen(stream);
  });

  const getSharedbDoc = docId => {
    return connection.get(dbCollection, docId);
  }
  return getSharedbDoc;
}
