import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

type NodeType = 'paragraph' | 'code';
type CustomElement = { type: NodeType; children: CustomText[] };
type CustomText = {
  text: string;
  bold?: boolean;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
