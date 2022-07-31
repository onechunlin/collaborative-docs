// This file is created by egg-ts-helper@1.30.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCollDoc from '../../../app/controller/collDoc';
import ExportDoc from '../../../app/controller/doc';
import ExportMdDoc from '../../../app/controller/mdDoc';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    collDoc: ExportCollDoc;
    doc: ExportDoc;
    mdDoc: ExportMdDoc;
    user: ExportUser;
  }
}
