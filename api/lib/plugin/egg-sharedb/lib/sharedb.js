'use strict';

const ShareDB = require('sharedb');
const WebSocket = require('ws');
const richText = require('rich-text');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');


module.exports = app => {
  // 注册富文本类型
  ShareDB.types.register(richText.type);
  // 创建 sharedb 实例
  const backend = new ShareDB(app.config.sharedb);
  // todo 这是干啥的
  const connection = backend.connect();
  // todo 
  const doc = connection.get('examples', 'richtext');
  // todo
  doc.fetch(function(err) {
    if (err) throw err;
    if (doc.type === null) {
      doc.create([{insert: 'Hi!'}], 'rich-text', () => {
        startServer(backend)
      });
      return;
    }
    startServer(backend);
  });
};

function startServer(backend) {
  const wss = new WebSocket.Server({ port: 8080 }, () => {
    console.log('Listening on http://localhost:8080');
  });

  wss.on('connection', function(ws) {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });
}
