import { getToken } from '@/services';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
/**
 * 天坑问题，查了一天多的问题，竟然是因为 client 和 server 版本不匹配出现的 ping timeout
 * 兼容性问题详见 https://socket.io/docs/v4/client-installation/
 */
import io from 'socket.io-client';
import './index.less';

export default function Edit() {
  const { docId } = useParams<{ docId: string }>();

  function connectWebsocket(token: string) {
    //和后端服务建立链接
    const socket = io('ws://127.0.0.1:7001/io/doc', {
      transports: ['websocket'],
      query: {
        token,
      },
    });

    socket.on('connect', () => {
      socket.emit('detail', docId);
    });
    socket.on('disconnect', () => {
      console.log('disconnect!');
    });
  }

  useEffect(() => {
    getToken().then((res) => {
      const { token } = res;
      connectWebsocket(token);
    });
  }, []);

  return (
    <div className="edit-wrapper">
      <div className="edit-container">{docId}</div>
    </div>
  );
}
