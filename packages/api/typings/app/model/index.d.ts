// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCollDocInfo from '../../../app/model/collDocInfo';
import ExportMarkdownDoc from '../../../app/model/markdownDoc';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    CollDocInfo: ReturnType<typeof ExportCollDocInfo>;
    MarkdownDoc: ReturnType<typeof ExportMarkdownDoc>;
    User: ReturnType<typeof ExportUser>;
  }
}
