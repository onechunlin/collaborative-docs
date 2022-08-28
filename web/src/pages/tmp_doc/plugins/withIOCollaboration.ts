import { Editor } from 'slate';
import withOtJson1 from './withOtJson1';
import withWebSocket, { WebSocketPluginOptions } from './withWebSocket';

const withIOCollaboration = (editor: Editor, options: WebSocketPluginOptions) =>
  withWebSocket(withOtJson1(editor), options);

export default withIOCollaboration;
