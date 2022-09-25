import { Editor } from 'slate';

const withVoid = (editor: Editor): Editor => {
  const { isVoid } = editor;

  editor.isVoid = (element) =>
    ['divider'].includes(element.type) || isVoid(element);

  return editor;
};

export default withVoid;
