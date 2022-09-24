// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCollDoc from '../../../app/controller/collDoc';
import ExportMdDoc from '../../../app/controller/mdDoc';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    collDoc: ExportCollDoc;
    mdDoc: ExportMdDoc;
    user: ExportUser;
  }
}
