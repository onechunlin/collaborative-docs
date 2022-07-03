// This file is created by egg-ts-helper@1.30.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDoc from '../../../app/controller/doc';
import ExportMdDoc from '../../../app/controller/mdDoc';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    doc: ExportDoc;
    mdDoc: ExportMdDoc;
    user: ExportUser;
  }
}
