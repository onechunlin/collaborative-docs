import { Editor } from 'slate';
import withInline from './withInline';
import withOtJson1 from './withOtJson1';
import withVoid from './withVoid';
import withWebSocket, { WebSocketPluginOptions } from './withWebSocket';

const withIOCollaboration = (editor: Editor, options: WebSocketPluginOptions) =>
  withVoid(withInline(withWebSocket(withOtJson1(editor), options)));

export default withIOCollaboration;
