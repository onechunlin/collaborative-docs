import { KeyboardEvent } from 'react';
import { Editor } from 'slate';
import { CustomEditor } from './command';

export const handleKeyDown = (
  editor: Editor,
  event: KeyboardEvent<HTMLDivElement>,
) => {
  if (!event.metaKey) {
    return;
  }
  switch (event.key) {
    case 'b':
      event.preventDefault();
      CustomEditor.toggleBoldMark(editor);
      break;
    case '`':
      event.preventDefault();
      CustomEditor.toggleCodeBlock(editor);
      break;
    default:
      break;
  }
};
