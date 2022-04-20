// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDoc from '../../../app/model/doc';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Doc: ReturnType<typeof ExportDoc>;
    User: ReturnType<typeof ExportUser>;
  }
}
