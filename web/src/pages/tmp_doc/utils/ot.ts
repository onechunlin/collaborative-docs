import {
  Editor,
  Element,
  Node,
  Operation,
  Path as SlatePath,
  Text,
} from 'slate';
import {
  editOp,
  insertOp,
  Path,
  JSONOp,
  replaceOp,
  Doc,
  removeOp,
  type,
} from 'ot-json1';
import { CustomEditor } from './command';

export const getJsonPathFromNode = (path: SlatePath, key?: string): Path => {
  const res: Path = [];
  path.forEach((p, index) => {
    if (index !== path.length - 1) {
      res.push(p, 'children');
    } else {
      key ? res.push(p, key) : res.push(p);
    }
  });
  return res;
};

export const getJsonOpFromSlate = (e: Editor, op: Operation): JSONOp => {
  switch (op.type) {
    case 'insert_text': {
      const { offset, path, text } = op;
      return editOp(getJsonPathFromNode(path, 'text'), 'text-unicode', [
        offset,
        text,
      ]);
    }

    case 'remove_text': {
      const { offset, path, text } = op;
      return editOp(getJsonPathFromNode(path, 'text'), 'text-unicode', [
        offset,
        { d: text.length },
      ]);
    }

    case 'split_node': {
      // 分割节点时 slate 总是将后面那个点的分割先触发
      const { path, properties } = op;
      // 节点的最后一个路径节点，分割的节点应该是当前节点的相邻兄弟节点
      const nodeLastPath = path[path.length - 1];
      const newNodePath = path
        .slice(0, path.length - 1)
        .concat(nodeLastPath + 1);

      if (Text.isText(Node.get(e, path))) {
        // 分隔文本
        const prevText = CustomEditor.string(e, path);
        const nextText = CustomEditor.string(e, newNodePath);

        const oldTextOp = replaceOp(
          getJsonPathFromNode(path, 'text'),
          true,
          prevText,
        );
        const newTextOp = insertOp(getJsonPathFromNode(newNodePath), {
          ...properties,
          text: nextText,
        } as Doc);

        return [oldTextOp, newTextOp].reduce(type.compose, null) as JSONOp;
      } else if (Element.isElement(Node.get(e, path))) {
        // 分隔节点
        const oldNode = Node.get(e, path);
        const newNode = Node.get(e, newNodePath);

        const oldNodeOp = replaceOp(
          getJsonPathFromNode(path),
          true,
          oldNode as Doc,
        );
        const newNodeOp = insertOp(
          getJsonPathFromNode(newNodePath),
          newNode as Doc,
        );
        return [oldNodeOp, newNodeOp].reduce(type.compose, null) as JSONOp;
      } else {
        return null;
      }
    }

    case 'merge_node': {
      const { path } = op;
      // 节点的最后一个路径节点，合并的节点应该是当前节点的前一个相邻兄弟节点
      const curNodeLastPath = path[path.length - 1];
      const prevNodePath = path
        .slice(0, path.length - 1)
        .concat(curNodeLastPath - 1);

      // 当前 path 可能已经合并，所以用前一个路径来判断
      const curNode = Node.get(e, prevNodePath);

      if (Text.isText(curNode)) {
        // 合并文本
        // 此时拿到的为合并之后的值，所以直接用 prevText 替换原有的值即可
        const prevText = CustomEditor.string(e, prevNodePath);
        // 删除当前位置的节点
        const deleteCurOp = removeOp(getJsonPathFromNode(path));
        const replacePrevOp = replaceOp(
          getJsonPathFromNode(prevNodePath, 'text'),
          true,
          // 9999 表示删除 position 后的所有元素，因为在 slate op 中获取不到当前长度
          prevText,
        );

        return [deleteCurOp, replacePrevOp].reduce(
          type.compose,
          null,
        ) as JSONOp;
      } else if (Element.isElement(curNode)) {
        // 合并节点
        // 删除当前位置的节点
        const deleteCurOp = removeOp(getJsonPathFromNode(path));
        const replacePrevOp = replaceOp(
          getJsonPathFromNode(prevNodePath),
          true,
          // 9999 表示删除 position 后的所有元素，因为在 slate op 中获取不到当前长度
          curNode,
        );
        return [deleteCurOp, replacePrevOp].reduce(
          type.compose,
          null,
        ) as JSONOp;
      } else {
        return null;
      }
    }

    case 'insert_node': {
      const { path, node } = op;
      return insertOp(getJsonPathFromNode(path), node as Doc);
    }

    case 'remove_node': {
      const { path } = op;
      return removeOp(getJsonPathFromNode(path));
    }

    case 'set_node': {
      const { path } = op;
      const curNode = Node.get(e, path);

      return replaceOp(getJsonPathFromNode(path), true, curNode as Doc);
    }
    default:
      return null;
  }
};
