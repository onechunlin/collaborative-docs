import { Operation, Path as SlatePath } from 'slate';
import { editOp, insertOp, moveOp, Path, JSONOp } from 'ot-json1';

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
