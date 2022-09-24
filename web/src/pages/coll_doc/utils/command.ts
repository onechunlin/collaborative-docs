import { Editor, Transforms, Text, Element, Range, Node } from 'slate';
import { LinkElement, ParagraphElement } from '../typings';
import { getNodePathWithElementValue } from './element';

/**
 * 判断函数
 */
const JudgmentFunction = {
  // 当前选择区域是否加粗
  isBoldMarkActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => !!(n as Text).bold,
      universal: true,
    });

    return !!match;
  },

  // 当前选择区域是否斜体
  isItalicMarkActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => !!(n as Text).italic,
      universal: true,
    });

    return !!match;
  },

  // 当前选择区域是否下划线
  isUnderlineMarkActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => !!(n as Text).underline,
      universal: true,
    });

    return !!match;
  },

  // 当前选择区域是否删除线
  isLineThroughMarkActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => !!(n as Text).lineThrough,
      universal: true,
    });

    return !!match;
  },

  // 当前选择区域是否上下标
  isScriptMarkActive(editor: Editor, script: 'super' | 'sub'): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) => (n as Text).textScript === script,
      universal: true,
    });

    return !!match;
  },

  // 当前段落对齐方式
  isParagraphTextAlignActive(
    editor: Editor,
    align: 'left' | 'center' | 'right' | 'justify',
  ): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        Element.isElement(n) && (n as ParagraphElement).textAlign === align,
      universal: true,
    });

    return !!match;
  },

  // 获取当前选择文本的字体大小
  getFontSize(editor: Editor): number | undefined {
    const [match] = Editor.nodes(editor, {
      match: (n) => Text.isText(n),
      universal: true,
    });
    const [node] = match || [];

    return (node as Text)?.size;
  },

  // 当前选择区域是否为链接
  isLinkActive(editor: Editor) {
    const [link] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === 'link',
    });
    return !!link;
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

  // 切换删除线
  toggleLineThroughMark(editor: Editor): void {
    const isActive = JudgmentFunction.isLineThroughMarkActive(editor);
    Transforms.setNodes(
      editor,
      { lineThrough: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  // 切换上标
  toggleSuperScriptMark(editor: Editor): void {
    const isActive = JudgmentFunction.isScriptMarkActive(editor, 'super');
    Transforms.setNodes(
      editor,
      { textScript: isActive ? undefined : 'super' },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  // 切换下标
  toggleSubScriptMark(editor: Editor): void {
    const isActive = JudgmentFunction.isScriptMarkActive(editor, 'sub');
    Transforms.setNodes(
      editor,
      { textScript: isActive ? undefined : 'sub' },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  // 切换段落对齐方式
  toggleParagraphTextAlign(
    editor: Editor,
    align: 'left' | 'center' | 'right' | 'justify',
  ): void {
    const isActive = JudgmentFunction.isParagraphTextAlignActive(editor, align);
    Transforms.setNodes(
      editor,
      { textAlign: isActive ? undefined : align },
      { match: (n) => Element.isElement(n) && n.type === 'paragraph' },
    );
  },

  // 切换字体大小
  toggleFontSize(editor: Editor, size: number): void {
    const isActive = JudgmentFunction.getFontSize(editor) === size;

    // 当调整不同字体大小的字体时，偶尔导致选区和实际的 selection 不一致，应该是 slate 的一个 bug
    Transforms.setNodes(
      editor,
      { size: isActive ? undefined : size },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  // 切换字体颜色
  toggleFontColor(editor: Editor, color?: string): void {
    Transforms.setNodes(
      editor,
      { color: color },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  // 切换背景颜色
  toggleBgColor(editor: Editor, color?: string): void {
    Transforms.setNodes(
      editor,
      { bgColor: color },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  // 解除链接
  unsetLink(editor: Editor, ele?: Element) {
    // 如果没有指定元素，则使用当前选择范围
    if (!ele) {
      const isActive = JudgmentFunction.isLinkActive(editor);

      isActive &&
        Transforms.unwrapNodes(editor, {
          match: (n) => Element.isElement(n) && n.type === 'link',
        });
      return;
    }

    // 如果指定了元素，则对指定元素解除链接
    const linkPath = getNodePathWithElementValue(editor, ele);
    linkPath &&
      Transforms.unwrapNodes(editor, {
        match: (n) => Element.isElement(n) && n.type === 'link',
        at: linkPath,
      });
  },

  // 设置链接
  setLink(editor: Editor, url: string, ele?: Element) {
    if (!ele) {
      const link: LinkElement = {
        type: 'link',
        url,
        children: [],
      };
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: 'end' });
      return;
    }

    const linkPath = getNodePathWithElementValue(editor, ele);
    linkPath && Transforms.setNodes(editor, { url }, { at: linkPath });
  },
};

export const CustomEditor = {
  ...Editor,
  ...JudgmentFunction,
  ...ActionFunction,
};
