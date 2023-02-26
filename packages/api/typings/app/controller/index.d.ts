// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCollDoc from '../../../app/controller/collDoc';
import ExportFile from '../../../app/controller/file';
import ExportMdDoc from '../../../app/controller/mdDoc';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    collDoc: ExportCollDoc;
    file: ExportFile;
    mdDoc: ExportMdDoc;
    user: ExportUser;
  }
}
