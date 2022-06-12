import { getMdDocDetail, updateMdDoc } from '@/services/mdDoc';
import { TMdDoc } from '@/typings/mdDoc';
import { Divider, Input, Message } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import debounce from '@/utils/debounce';

import './index.less';

export default function Edit() {
  const { docId } = useParams<{ docId: string }>();
  const [mdContent, setMdContent] = useState<string>('');
  const [docDetail, setDocDetail] = useState<TMdDoc>();

  useEffect(() => {
    getMdDocDetail(docId).then((res) => {
      setDocDetail(res);
      setMdContent(res.content || '');
    });
  }, [docId]);

  function autoSave(content: string) {
    setMdContent(content);
    debounce(() => {
      updateMdDoc(docId, content).catch((e) => {
        console.error(e);
        Message.error('实时保存失败');
      });
    }, 1000)();
  }

  return (
    <div className="md-container">
      <div className="doc-title">
        <span className="title">{docDetail?.title}</span>
      </div>
      <Divider style={{ marginTop: 0 }} />
      <div className="md-edit-wrapper">
        <div className="edit">
          <Input.TextArea
            className="input"
            value={mdContent}
            onChange={autoSave}
          />
        </div>
        <Divider type="vertical" style={{ height: '100%' }} />
        <div className="preview">
          <ReactMarkdown>{mdContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
