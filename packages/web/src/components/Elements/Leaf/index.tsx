import { CustomEditor } from '@/utils/command';
import { getTextDecoration } from '@/utils/element';
import classNames from 'classnames';
import { CSSProperties, FC } from 'react';
import { Text, type Editor } from 'slate';
import { RenderLeafProps } from 'slate-react';
import Caret from './Caret';
import './index.less';

const findNodePath = (editor: Editor, text: Text) => {
  const entriesGenerator = CustomEditor.nodes(editor, {
    mode: 'all',
    at: [],
    match: (n) => {
      return Text.isText(n) && n === text;
    },
  });
  if (!entriesGenerator) return;
  const [entries] = Array.from(entriesGenerator);
  const [, path] = entries || [];
  return path;
};

/**
 * 叶子节点，即文本节点
 * @param props
 * @returns
 */
const Leaf: FC<RenderLeafProps & { editor: Editor }> = (props) => {
  const { attributes, children, leaf, editor, text } = props;

  let textStyle: CSSProperties = {
    fontSize: leaf.size,
    fontWeight: leaf.bold ? 'bold' : 'normal',
    fontStyle: leaf.italic ? 'italic' : 'normal',
    textDecoration: getTextDecoration(leaf),
    color: leaf.color,
    backgroundColor: leaf.bgColor,
  };

  const { textScript, cursorColor, name, isForward } = leaf;

  switch (textScript) {
    case 'super':
      textStyle = {
        ...textStyle,
        fontSize: 12,
        position: 'relative',
        top: '-0.25em',
        verticalAlign: 'top',
      };
      break;
    case 'sub':
      textStyle = {
        ...textStyle,
        fontSize: 12,
        position: 'relative',
        bottom: '-0.25em',
        verticalAlign: 'bottom',
      };
      break;
    default:
      break;
  }
  if (cursorColor) {
    textStyle = {
      ...textStyle,
      backgroundColor: cursorColor.slice(0, -2) + '0.2)',
      position: 'relative',
    };
  }

  const isInlineCodeStart = (): boolean => {
    if (!text.code) return false;
    const path = findNodePath(editor, text);
    if (!path) return false;
    const previousNode = CustomEditor.previous(editor, {
      mode: 'lowest',
      at: path,
    });
    // 如果前一个节点是文本节点并且是代码块，则当前不是开始节点
    if (previousNode && Text.isText(previousNode[0]) && previousNode[0].code) {
      return false;
    }
    return true;
  };

  const isInlineCodeEnd = (): boolean => {
    if (!text.code) return false;
    const path = findNodePath(editor, text);
    if (!path) return false;
    const nextNode = CustomEditor.next(editor, {
      mode: 'lowest',
      at: path,
    });
    // 如果前一个节点是文本节点并且是代码块，则当前不是结尾节点
    if (nextNode && Text.isText(nextNode[0]) && nextNode[0].code) {
      return false;
    }
    return true;
  };

  return (
    <span
      {...attributes}
      style={textStyle}
      className={classNames({
        'inline-code': leaf.code,
        'inline-code-start': isInlineCodeStart(),
        'inline-code-end': isInlineCodeEnd(),
      })}
    >
      {children}
      {cursorColor && name && (
        <Caret color={cursorColor} name={name} isForward={!!isForward} />
      )}
    </span>
  );
};
export default Leaf;
