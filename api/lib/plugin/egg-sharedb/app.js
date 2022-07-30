'use strict';

const sharedb = require('./lib/sharedb');

module.exports = app => {
  sharedb(app);
};