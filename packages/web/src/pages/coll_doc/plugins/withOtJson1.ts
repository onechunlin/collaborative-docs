/**
 * 处理 slate 的 op 操作到 json1 的 op 操作的转化，核心插件
 */
import { Editor, Operation } from 'slate';
import { getJsonOpFromSlate } from '../utils/ot';

export const withOTJson1 = (e: Editor) => {
  const { apply } = e;

  e.apply = (op: Operation) => {
    // 先应用上效果再上报 op 操作，防止阻止 UI 渲染
    apply(op);
    // 通过 slate 的 op 操作转化为 ot-json1 的 op 类型，详见 https://github.com/ottypes/json1
    const jsonOps = getJsonOpFromSlate(e, op);
    if (jsonOps) {
      // 上报 json1 操作
      e.doc.submitOp(jsonOps);
    }
  };

  return e;
};

export default withOTJson1;
