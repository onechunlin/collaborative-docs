import { Editor } from 'slate';
import isUrl from 'validator/lib/isURL';
import { CustomEditor } from '../utils/command';

const withInline = (e: Editor): Editor => {
  const { insertData, isInline } = e;

  e.isInline = (element) =>
    ['link'].includes(element.type) || isInline(element);

  e.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      CustomEditor.addLink(e, text);
    } else {
      insertData(data);
    }
  };

  return e;
};

export default withInline;
