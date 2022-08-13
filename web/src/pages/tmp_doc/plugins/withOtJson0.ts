import { Doc } from 'sharedb/lib/client';
import { Editor, Operation, Path as SlatePath } from 'slate';
import { editOp, insertOp, moveOp, Path, type, JSONOp } from 'ot-json1';

export const withOtJson0 = (editor: Editor, doc: Doc): Editor => {
  const e = editor;
  const { apply } = e;

  e.apply = (op: Operation) => {
    console.log('🚀 ~ file: withOtJson0.ts ~ line 8 ~ withHistory ~ op', op);

    apply(op);
    const jsonOp = getJsonOpFromSlate(op);
    if (jsonOp) {
      doc.submitOp(jsonOp);
    }
  };

  return e;
};

export const getJson1PathFromText = (path: SlatePath): Path => {
  const res: Path = ['content'];
  path.forEach((p, index) => {
    if (index !== path.length - 1) {
      res.push(p, 'children');
    } else {
      res.push(p, 'text');
    }
  });
  return res;
};

export const getJsonOpFromSlate = (op: Operation): JSONOp | undefined => {
  switch (op.type) {
    case 'insert_text': {
      const { offset, path, text } = op;
      return editOp(getJson1PathFromText(path), 'text-unicode', [offset, text]);
    }

    case 'remove_text': {
      const { offset, path, text } = op;
      return editOp(getJson1PathFromText(path), 'text-unicode', [
        offset,
        { d: text.length },
      ]);
    }
    default:
      break;
  }
};

export const getSlateOpFromJson = (op: JSONOp): Operation | undefined => {
  if (!op) {
    return;
  }
  // const slateOp: Operation;

  // return slateOp;
};
