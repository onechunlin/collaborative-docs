import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { WebSocketEditor } from '../plugins/withWebSocket';

export type ParagraphElement = {
  type: 'paragraph';
  children: Descendant[];
};

export type CodeElement = {
  type: 'code';
  children: Descendant[];
};

export type HeadingElement = {
  type: 'heading';
  level: number;
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
};

export type CustomElement = ParagraphElement | CodeElement | HeadingElement;

export type CustomText = FormattedText;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & WebSocketEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
