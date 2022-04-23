import { getToken } from '@/services';
import { TDoc } from '@/typings/doc';
import { Message } from '@arco-design/web-react';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import produce, { applyPatches, Patch, enablePatches } from 'immer';
import { debounce } from 'lodash';
/**
 * 天坑问题，查了一天多的问题，竟然是因为 client 和 server 版本不匹配出现的 ping timeout
 * 兼容性问题详见 https://socket.io/docs/v4/client-installation/
 */
import io from 'socket.io-client';
import './index.less';

enablePatches();

const changes: Patch[] = [];
const inverseChanges: Patch[] = [];

export default function Edit() {
  const { docId } = useParams<{ docId: string }>();
  const [docDetail, setDocDetail] = useState<Partial<TDoc>>({});
  const [socket, setSocket] = useState<any>({});

  useEffect(() => {
    getToken().then((res) => {
      const { token } = res;
      initWebsocket(token);
    });
  }, []);

  function initWebsocket(token: string) {
    //和后端服务建立链接
    const socket = io('ws://127.0.0.1:7001/io/doc', {
      transports: ['websocket'],
      query: {
        token,
      },
    });
    setSocket(socket);

    socket.on('connect', () => {
      console.log('成功连接服务器🚀 ~');
      socket.emit('detail', docId);
    });

    socket.on('disconnect', () => {
      Message.error('断开服务器链接');
    });

    socket.on('detail', (detail: TDoc) => {
      setDocDetail(detail);
    });

    socket.on('update', (updatePatches: Patch[]) => {
      const newDocDetail = applyPatches(docDetail, updatePatches);
      setDocDetail(newDocDetail);
    });
  }

  function handleTitleChange(e: FormEvent<HTMLHeadingElement>) {
    produce(
      docDetail,
      (draft) => {
        draft.title = e.target?.innerText || draft?.title;
      },
      (patches, inversePatches) => {
        changes.push(...patches);
        inverseChanges.push(...inversePatches);
      },
    );
    socket.emit('update', {
      docId,
      changes,
    });
  }

  return (
    <div className="edit-wrapper">
      <div className="edit-container">
        <h1
          contentEditable
          suppressContentEditableWarning
          onInput={debounce(handleTitleChange, 1000)}
        >
          {docDetail?.title}
        </h1>
      </div>
    </div>
  );
}
