import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { WebSocketEditor } from '../plugins/withWebSocket';

export type ParagraphElement = {
  type: 'paragraph';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  children: Descendant[];
};

export type CodeElement = {
  type: 'code';
  children: Descendant[];
};

export type LinkElement = {
  type: 'link';
  url: string;
  children: CustomText[];
};

export type HeadingElement = {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5;
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

export type CustomElement =
  | ParagraphElement
  | CodeElement
  | HeadingElement
  | LinkElement
  | DividerElement;

export type CustomText = FormattedText;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & WebSocketEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
