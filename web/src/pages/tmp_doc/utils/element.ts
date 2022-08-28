import { Text } from 'slate';

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
