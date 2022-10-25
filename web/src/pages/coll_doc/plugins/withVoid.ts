import { Editor } from 'slate';

const withVoid = (e: Editor): Editor => {
  const { isVoid } = e;

  e.isVoid = (element) => ['divider'].includes(element.type) || isVoid(element);

  return e;
};

export default withVoid;
