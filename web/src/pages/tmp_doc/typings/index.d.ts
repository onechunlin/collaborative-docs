import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

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

export type FormattedText = { text: string; bold?: true };

export type CustomElement = ParagraphElement | CodeElement | HeadingElement;

export type CustomText = FormattedText;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
