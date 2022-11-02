import { Editor, Node, Path, Text } from 'slate';

// 获取文本的描述，如下划线，删除线等
export function getTextDecoration(leaf: Text): string {
  const textDecorationArray: string[] = [];
  if (leaf.underline) {
    textDecorationArray.push('underline');
  }
  if (leaf.lineThrough) {
    textDecorationArray.push('line-through');
  }
  return textDecorationArray.length > 0
    ? textDecorationArray.join(' ')
    : 'none';
}

// 通过节点的值来获取节点的 path（路径），此处通过判断对象的地址是否相等来决定是否匹配节点
export function getNodePathWithElementValue(
  editor: Editor,
  elementValue: Node,
): Path | undefined {
  const nodeEntries = Node.nodes(editor);

  for (const nodeEntry of nodeEntries) {
    const [node, path] = nodeEntry;

    if (node === elementValue) {
      return path;
    }
  }
}
