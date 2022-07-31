// This file is created by egg-ts-helper@1.30.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCollDocInfo from '../../../app/model/collDocInfo';
import ExportDoc from '../../../app/model/doc';
import ExportMarkdownDoc from '../../../app/model/markdownDoc';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    CollDocInfo: ReturnType<typeof ExportCollDocInfo>;
    Doc: ReturnType<typeof ExportDoc>;
    MarkdownDoc: ReturnType<typeof ExportMarkdownDoc>;
    User: ReturnType<typeof ExportUser>;
  }
}
