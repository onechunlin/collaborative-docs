import { Editor, Transforms, Text } from 'slate';

/**
 * 判断函数
 */
const JudgmentFunction = {
  // 当前选择区域是否加粗
  isBoldMarkActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold,
      universal: true,
    });

    return !!match;
  },

  // 当前选择区域是否斜体
  isItalicMarkActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic,
      universal: true,
    });

    return !!match;
  },

  // 当前选择区域是否下划线
  isUnderlineMarkActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.underline,
      universal: true,
    });

    return !!match;
  },
};

/**
 * 具体的行为函数
 */
const ActionFunction = {
  // 切换加粗
  toggleBoldMark(editor: Editor): void {
    const isActive = JudgmentFunction.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  // 切换斜体
  toggleItalicMark(editor: Editor): void {
    const isActive = JudgmentFunction.isItalicMarkActive(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  // 切换下划线
  toggleUnderlineMark(editor: Editor): void {
    const isActive = JudgmentFunction.isUnderlineMarkActive(editor);
    Transforms.setNodes(
      editor,
      { underline: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true },
    );
  },
};

export const CustomEditor = {
  ...Editor,
  ...JudgmentFunction,
  ...ActionFunction,
};
