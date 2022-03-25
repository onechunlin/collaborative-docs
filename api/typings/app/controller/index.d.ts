// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    user: ExportUser;
  }
}
