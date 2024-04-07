/**
 * 获取鼠标信息的插件，需要和 withWebSocket 结合使用，详细方法请查看 withIOCollaboration
 */

import { nanoid } from 'nanoid';
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
  // 创建当前用户的在场信息，并绑定
  const presenceId = nanoid();
  const localPresence = presence.create(presenceId);

  // 当前 client 的在场 ID
  e.presenceId = presenceId;
  // 当前文档在线实例
  e.presence = presence;
  // 提交当前 client 在线状态信息的方法，在 ot.ts 中用到
  e.submitLocalPresence = debounce((value: CustomRange) => {
    localPresence.submit(value, function (error) {
      if (error) throw error;
    });
  }, 500);

  return e;
};

export default withCursor;
