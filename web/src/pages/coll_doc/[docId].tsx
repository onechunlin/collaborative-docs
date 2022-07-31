import ReconnectingWebSocket from 'reconnecting-websocket';
import sharedb, { Doc } from 'sharedb/lib/client';
import richText from 'rich-text';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import { Socket } from 'sharedb/lib/sharedb';
import ObjectID from 'bson-objectid';
import tinycolor from 'tinycolor2';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Delta from 'quill-delta';
import Toolbar from './components/Toobar';
import './index.less';
import { COLL_DOC_COLLECTION } from '@/constants';
import { Input, Message, Result, Spin } from '@arco-design/web-react';
import { collDocInfoDetail, updateTitle } from '@/services/collDoc';
import debounce from '@/utils/debounce';

sharedb.types.register(richText.type);
Quill.register('modules/cursors', QuillCursors);

const colors: Record<string, string> = {};
const presenceId = new ObjectID().toString();

export default function CollaborativeDoc() {
  const { docId } = useParams<{ docId: string }>();
  const [title, setTitle] = useState<string>();
  const [titleReady, setTitleReady] = useState<boolean>(false);
  const [doc, setDoc] = useState<Doc>();

  useEffect(() => {
    // 拉取文档标题
    collDocInfoDetail(docId)
      .then((res) => {
        setTitle(res.title);
      })
      .catch((e) => {
        Message.error('查询文档详情失败');
        console.error(e);
      })
      .finally(() => {
        setTitleReady(true);
      });

    // 拉取文档内容，初始化 websocket 连接
    const socket = new ReconnectingWebSocket(
      `ws://${
        location.port ? location.hostname + ':8080' : location.host + '/ws'
      }?docId=${docId}`,
    );
    const connection = new sharedb.Connection(socket as Socket);
    const curDoc = connection.get(COLL_DOC_COLLECTION, docId);

    curDoc.subscribe(function (err) {
      if (err) {
        throw err;
      }
      setDoc(curDoc);
    });
  }, [docId]);

  useEffect(() => {
    if (titleReady && doc?.data) {
      initQuill(doc);
    }
  }, [titleReady, doc]);

  function initQuill(doc: Doc) {
    const quill = new Quill('#editor', {
      modules: {
        cursors: {
          hideDelayMs: 500,
        },
        toolbar: '#toolbar',
      },
      theme: 'snow',
      placeholder: '请输入文章内容',
    });
    const cursors = quill.getModule('cursors');

    // 设置初始值
    quill.setContents(doc.data);

    // 监听文档变化
    quill.on('text-change', function (delta, oldDelta, source) {
      /**
       * 如果不是用户输入的（quill.updateContents(op) 触发的），
       * 则不上报 delta，防止重复上报
       */
      if (source !== 'user') {
        return;
      }
      doc.submitOp(delta);
    });

    // 监听 op 操作，如果不是自身 op 则更新文档
    doc.on('op', function (op, source) {
      // 如果来源是自身的 op 操作，则忽略
      if (source) {
        return;
      }

      quill.updateContents((op as unknown) as Delta);
    });

    // 获取当前文档的在场信息（同时打开文档的人）
    const presence = doc.connection.getDocPresence(COLL_DOC_COLLECTION, docId);

    // 注册在场信息
    presence.subscribe(function (error) {
      if (error) throw error;
    });
    // 监听 receive 方法，每次结束到有新的人选择时，处理光标信息
    presence.on('receive', function (id, range) {
      const color = colors[id] || tinycolor.random().toHexString();
      const name = (range && range.name) || '未知';
      // // 如果当前打开文档是自己，即同一个文档打开多个 tab，则不创建新的光标
      // if (name === window.userInfo.username) {
      //   return;
      // }
      cursors.createCursor(id, name, color);
      cursors.moveCursor(id, range);
    });

    // 创建当前用户的在场信息，当选取改变时上报事件
    const localPresence = presence.create(presenceId);

    quill.on('selection-change', function (range, oldRange, source) {
      // 如果不是用户操作产生的改变，则忽略
      // 如果没有选择区域，则忽略
      if (source !== 'user' || !range) {
        return;
      }
      const customRange = { ...range, name: window.userInfo.username };
      // 上报当前的选择区域变化
      localPresence.submit(customRange, function (error) {
        if (error) throw error;
      });
    });

    return quill;
  }

  function handleTitleChange(value: string): void {
    setTitle(value);
    const debounceUpdate = debounce(() => {
      updateTitle(docId, value).catch((e) => {
        Message.error('标题更新失败');
        console.error(e);
      });
    }, 1000);

    debounceUpdate();
  }

  if (!titleReady || !doc) {
    return (
      <Spin
        loading
        block
        tip="文档内容拉取中，请稍后..."
        className="loading-bar"
      />
    );
  }

  if (titleReady && doc && !doc?.data) {
    return (
      <Result
        className="empty-doc"
        status="404"
        subTitle="没有找到该文档，请确认文档 ID 是否存在"
      />
    );
  }

  return (
    <div id="coll-doc-container">
      <Input
        id="doc-title"
        placeholder="请输入标题"
        value={title}
        onChange={handleTitleChange}
      />
      <div id="toolbar">
        <Toolbar />
      </div>
      <div id="editor"></div>
    </div>
  );
}
