'use strict';

const sharedb = require('./lib/sharedb');

module.exports = app => {
  // 先暂时通过插件的方式同时启动 HTTP 服务器和 WebSocket 服务器
  sharedb(app);
};