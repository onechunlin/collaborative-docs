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
import { get } from 'lodash';

export const getJsonPathFromNode = (
  path: SlatePath,
  key?: string | number,
): Path => {
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
      const { path, position, properties } = op;
      // 当前节点的相邻兄弟节点
      const nextPath = SlatePath.next(path);
      const curNode = get(e.doc.data, getJsonPathFromNode(path));

      if (Text.isText(curNode)) {
        // 分隔文本
        const originText: string = get(
          e.doc.data,
          getJsonPathFromNode(path, 'text'),
        );

        const prevNodeOp = editOp(
          getJsonPathFromNode(path, 'text'),
          'text-unicode',
          [position, { d: originText.length - position }],
        );
        const nextNodeOp = insertOp(getJsonPathFromNode(nextPath), {
          ...properties,
          text: originText.substring(position),
        } as Doc);

        return [prevNodeOp, nextNodeOp].reduce(type.compose, null) as JSONOp;
      } else if (Element.isElement(curNode)) {
        // 分隔节点
        const nodeChildren = get(
          e.doc.data,
          getJsonPathFromNode(path),
        ).children;
        // 前一个节点的子节点
        const prevChildren = nodeChildren.slice(0, position);
        // 下一个节点的子节点
        const nextChildren = nodeChildren.slice(position);

        const prevNodeOp = replaceOp(
          getJsonPathFromNode(path, 'children'),
          true,
          prevChildren,
        );
        const nextNodeOp = insertOp(getJsonPathFromNode(nextPath), {
          ...properties,
          children: nextChildren,
        } as Doc);
        return [prevNodeOp, nextNodeOp].reduce(type.compose, null) as JSONOp;
      } else {
        return null;
      }
    }

    case 'merge_node': {
      const { path, position } = op;
      // 当前节点的前一个相邻兄弟节点
      const prevPath = SlatePath.previous(path);

      const curNode = get(e.doc.data, getJsonPathFromNode(path));
      if (Text.isText(curNode)) {
        // 合并文本
        const curText = get(e.doc.data, getJsonPathFromNode(path, 'text'));
        // 删除当前位置的节点
        const deleteCurOp = removeOp(getJsonPathFromNode(path));
        const editPrevOp = editOp(
          getJsonPathFromNode(prevPath, 'text'),
          'text-unicode',
          [position, curText],
        );

        return [deleteCurOp, editPrevOp].reduce(type.compose, null) as JSONOp;
      } else if (Element.isElement(curNode)) {
        // 合并节点
        const curNodeChildren = curNode.children as Text[];
        const prevNodeChildren = get(e.doc.data, prevPath).children as Text[];

        // 删除当前位置的节点
        const deleteCurOp = removeOp(getJsonPathFromNode(path));
        // 将当前节点的子节点添加到前一个节点的子节点
        const replacePrevOp = replaceOp(
          getJsonPathFromNode(prevPath, 'children'),
          true,
          prevNodeChildren.concat(curNodeChildren),
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
      const { path, properties, newProperties } = op;

      const ops = Object.keys({ ...newProperties, ...properties }).reduce(
        (prev, cur) => {
          prev.push(
            replaceOp(
              getJsonPathFromNode(path, cur),
              properties[cur as keyof Node],
              newProperties[cur as keyof Node],
            ),
          );
          return prev;
        },
        [] as JSONOp[],
      );

      return ops.reduce(type.compose, null) as JSONOp;
    }

    case 'move_node': {
      const { path, newPath } = op;
      const fromPath = getJsonPathFromNode(path);
      const toPath = getJsonPathFromNode(newPath);
      const node = get(e.doc.data, fromPath);
      const insertNodeOp = insertOp(toPath, node);
      const deleteNodeOp = removeOp(fromPath);
      //  直接使用 moveOp 无效，所以这里手动来进行值移动操作
      // return moveOp(fromPath, toPath);
      return [insertNodeOp, deleteNodeOp].reduce(type.compose, null) as JSONOp;
    }

    case 'set_selection': {
      const { selection } = e;
      const { anchor, focus } = selection || {};

      anchor &&
        focus &&
        e.submitLocalPresence({
          anchor,
          focus,
          name: window.userInfo.username,
        });
      return null;
    }
    default:
      return null;
  }
};
