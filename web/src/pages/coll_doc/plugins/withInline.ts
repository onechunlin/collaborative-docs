import { Editor } from 'slate';
import isUrl from 'validator/lib/isURL';
import { CustomEditor } from '../utils/command';

const withInline = (editor: Editor): Editor => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) =>
    ['link'].includes(element.type) || isInline(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      CustomEditor.toggleLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      CustomEditor.toggleLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export default withInline;
