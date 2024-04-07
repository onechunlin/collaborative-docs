/**
 * 判断哪些元素是空元素（无子节点的元素），这里对 divider 元素进行了判断，后续如果加入图片等元素也应该是空元素
 */

import { Editor } from 'slate';

const withVoid = (e: Editor): Editor => {
  const { isVoid } = e;

  e.isVoid = (element) => ['divider'].includes(element.type) || isVoid(element);

  return e;
};

export default withVoid;
