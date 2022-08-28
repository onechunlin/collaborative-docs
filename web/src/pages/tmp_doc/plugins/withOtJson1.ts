import { Editor, Operation } from 'slate';
import { getJsonOpFromSlate } from '../utils/ot';

export const withOTJson1 = (editor: Editor) => {
  const e = editor as Editor;
  const { apply } = e;

  e.apply = (op: Operation) => {
    console.log('🚀 ~ file: withOtJson1.ts ~ line 11 ~ withOTJson1 ~ op', op);
    apply(op);
    const jsonOps = getJsonOpFromSlate(e, op);

    if (jsonOps) {
      e.doc.submitOp(jsonOps);
    }
  };

  return e;
};

export default withOTJson1;
