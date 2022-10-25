import { Editor, Operation } from 'slate';
import { getJsonOpFromSlate } from '../utils/ot';

export const withOTJson1 = (e: Editor) => {
  const { apply } = e;

  e.apply = (op: Operation) => {
    apply(op);

    console.log('🚀 ~ file: withOtJson1.ts ~ line 12 ~ withOTJson1 ~ op', op);

    console.log(
      '🚀 ~ file: withOtJson1.ts ~ line 16 ~ withOTJson1 ~ e.doc.data',
      e.doc.data,
    );
    const jsonOps = getJsonOpFromSlate(e, op);
    if (jsonOps) {
      console.log(
        '🚀 ~ file: withOtJson1.ts ~ line 13 ~ withOTJson1 ~ jsonOps',
        jsonOps,
      );

      e.doc.submitOp(jsonOps);
    }
  };

  return e;
};

export default withOTJson1;
