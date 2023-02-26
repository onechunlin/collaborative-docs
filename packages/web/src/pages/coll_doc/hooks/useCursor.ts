/**
 * 处理光标在线状态。
 */
import randomColor from 'randomcolor';
import { useState, useCallback, useEffect } from 'react';
import { Text, Range, NodeEntry, Selection, Editor, Point } from 'slate';
import { CustomRange } from '../plugins/withCursor';

export interface CursorEditor {
  onCursor: (selection: Selection) => void;
}

export interface Cursor extends CustomRange {
  id: string;
  cursorColor: string;
  isForward: boolean;
}

type Decorate = (entry: NodeEntry) => Range[];

const useCursor = (e: Editor): Decorate => {
  // 使用一个 Map 来做文档在线状态的展示
  const [userCursorMap, setUserCursorMap] = useState<Map<string, Cursor>>(
    new Map(),
  );

  useEffect(() => {
    // 监听 receive 方法，每次结束到有新的人选择时，处理光标信息
    e.presence.on('receive', function (id: string, range: CustomRange) {
      if (id === e.presenceId) {
        return;
      }
      if (range === null) {
        userCursorMap.delete(id);
        setUserCursorMap(userCursorMap);
        return;
      }
      handlePresenceReceive(id, range);
    });
  }, []);

  // 接收到在线信息变更时的处理函数
  function handlePresenceReceive(id: string, range: CustomRange): void {
    const currentUserCursor = userCursorMap.get(id);
    const { anchor, focus } = range;

    if (currentUserCursor) {
      // 用户光标信息已存在
      userCursorMap.set(id, {
        ...currentUserCursor,
        ...range,
        isForward: Point.isAfter(anchor, focus),
      });
    } else {
      userCursorMap.set(id, {
        ...range,
        id,
        cursorColor: randomColor({
          luminosity: 'dark',
          format: 'rgba',
          alpha: 1,
        }),
        // 通过 anchor（鼠标落下时的位置） 和 focus（鼠标抬起的位置） 来判断用户的选择方向
        isForward: Point.isAfter(anchor, focus),
      });
    }
    setUserCursorMap(userCursorMap);
  }

  // 文档的装饰信息，详情请查看 withReact 插件
  const decorate = useCallback(
    ([node, path]: NodeEntry): Cursor[] => {
      const ranges: Cursor[] = [];

      if (Text.isText(node) && userCursorMap.size) {
        userCursorMap.forEach((value) => {
          if (Range.includes(value, path)) {
            ranges.push(value);
          }
        });
      }
      return ranges;
    },
    [userCursorMap],
  );

  return decorate;
};

export default useCursor;
