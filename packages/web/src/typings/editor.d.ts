import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { WebSocketEditor } from '../plugins/withWebSocket';
import { CursorEditor } from '../plugins/withCursor';

export type ParagraphElement = {
  type: 'paragraph';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  children: Descendant[];
};

// 这两暂时没有实现，感兴趣可以当成练手实现这两个节点
// export type CodeElement = {
//   type: 'code';
//   children: Descendant[];
// };

// export type HeadingElement = {
//   type: 'heading';
//   level: 1 | 2 | 3 | 4 | 5;
//   children: CustomText[];
// };

export type LinkElement = {
  type: 'link';
  url: string;
  children: CustomText[];
};

export type DividerElement = {
  type: 'divider';
  children: CustomText[];
};

export type FormattedText = {
  text: string;
  // 加粗
  bold?: boolean;
  // 斜体
  italic?: boolean;
  // 下划线
  underline?: boolean;
  // 删除线
  lineThrough?: boolean;
  // 上标/下标
  textScript?: 'super' | 'sub';
  // 字体大小
  size?: number;
  // 字体颜色
  color?: string;
  // 背景颜色
  bgColor?: string;
};

export type DecoratedText = {
  // 光标颜色
  cursorColor?: string;
  // 当前登录人名称
  name?: string;
  // 光标是否向前
  isForward?: boolean;
};

export type CustomElement = ParagraphElement | LinkElement | DividerElement;

export type CustomText = FormattedText & DecoratedText;

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor &
  WebSocketEditor &
  CursorEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
