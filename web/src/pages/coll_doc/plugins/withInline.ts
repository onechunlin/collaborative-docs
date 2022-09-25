import { Editor } from 'slate';
import isUrl from 'validator/lib/isURL';
import { CustomEditor } from '../utils/command';

const withInline = (editor: Editor): Editor => {
  const { insertData, isInline } = editor;

  editor.isInline = (element) =>
    ['link'].includes(element.type) || isInline(element);

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      CustomEditor.addLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export default withInline;
