// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDoc from '../../../app/controller/doc';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    doc: ExportDoc;
    user: ExportUser;
  }
}
