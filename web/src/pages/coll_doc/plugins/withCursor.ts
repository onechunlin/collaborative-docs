import ObjectID from 'bson-objectid';
import { debounce } from 'lodash';
import { Presence } from 'sharedb/lib/client';
import { Editor, Range } from 'slate';

export type CustomRange = Range & { name: string };

export interface CursorEditor {
  submitLocalPresence: (value: CustomRange) => void;
  presence: Presence;
  presenceId: string;
}

export const withCursor = (e: Editor) => {
  // 获取当前文档的在场信息（同时打开文档的人）
  const presence = e.doc.connection.getPresence(e.doc.id);
  // 订阅在场信息
  presence.subscribe(function (error) {
    if (error) throw error;
  });
  // 创建当前用户的在场信息，当选取改变时上报事件
  const presenceId = new ObjectID().toString();
  const localPresence = presence.create(presenceId);

  e.presenceId = presenceId;
  e.presence = presence;
  e.submitLocalPresence = debounce((value: CustomRange) => {
    localPresence.submit(value, function (error) {
      if (error) throw error;
    });
  }, 500);

  return e;
};

export default withCursor;
