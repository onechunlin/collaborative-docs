// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAuth from '../../../app/middleware/auth';
import ExportErrorHandler from '../../../app/middleware/errorHandler';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    errorHandler: typeof ExportErrorHandler;
  }
}
