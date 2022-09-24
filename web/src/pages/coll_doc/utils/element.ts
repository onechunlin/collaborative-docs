import { Editor, Node, Path, Text } from 'slate';

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
