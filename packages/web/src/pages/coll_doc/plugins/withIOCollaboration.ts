/**
 * 插件的协同使用，注意插件间的依赖关系
 */
import { Editor } from 'slate';
import withCursor from './withCursor';
import withInline from './withInline';
import withOtJson1 from './withOtJson1';
import withVoid from './withVoid';
import withWebSocket, { WebSocketPluginOptions } from './withWebSocket';

const withIOCollaboration = (e: Editor, options: WebSocketPluginOptions) =>
  withVoid(withInline(withOtJson1(withCursor(withWebSocket(e, options)))));

export default withIOCollaboration;
