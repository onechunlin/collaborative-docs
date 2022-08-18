import { Editor, Transforms, Text } from 'slate';

export const CustomEditor = {
  ...Editor,

  isBoldMarkActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => {
        console.log('🚀 ~ file: index.ts ~ line 7 ~ isBoldMarkActive ~ n', n);
        return n.bold === true;
      },
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code',
    });

    return !!match;
  },

  toggleBoldMark(editor: Editor): void {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  toggleCodeBlock(editor: Editor): void {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : 'code' },
      { match: (n) => Editor.isBlock(editor, n) },
    );
  },
};
