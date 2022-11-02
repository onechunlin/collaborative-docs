import { KeyboardEvent } from 'react';
import { Editor } from 'slate';
import { CustomEditor } from './command';

// 处理键盘按下快捷键
export const handleKeyDown = (
  editor: Editor,
  event: KeyboardEvent<HTMLDivElement>,
) => {
  if (!event.metaKey) {
    return;
  }
  switch (event.key) {
    case 'Enter':
      CustomEditor.removeMark(editor, 'bold');
      break;

    case 'b':
      event.preventDefault();
      CustomEditor.toggleBoldMark(editor);
      break;

    case 'i':
      event.preventDefault();
      CustomEditor.toggleItalicMark(editor);
      break;

    case 'u':
      event.preventDefault();
      CustomEditor.toggleUnderlineMark(editor);
      break;

    default:
      break;
  }
};
