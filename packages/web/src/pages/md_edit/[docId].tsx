import { getMdDocDetail, updateMdDoc } from '@/services/mdDoc';
import { TMdDoc } from '@/typings/mdDoc';
import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Message,
  Tooltip,
} from '@arco-design/web-react';
import { IconEdit, IconEye } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkDownRender from '@/components/MarkDown';
import dayjs from 'dayjs';
import debounce from '@/utils/debounce';

import './index.less';

export default function Edit() {
  const { docId } = useParams<{ docId: string }>();
  const [docDetail, setDocDetail] = useState<Partial<TMdDoc>>();
  const [contentEditing, setContentEditing] = useState(false);
  const [titleEditing, setTitleEditing] = useState(false);

  const [isAutoSave, setIsAutoSave] = useState(true);

  useEffect(() => {
    getMdDocDetail(docId).then((res) => {
      setDocDetail(res);
      if (!res.content) {
        setContentEditing(true);
      }
    });
  }, [docId]);

  async function saveDoc(docParams: Partial<TMdDoc>) {
    await updateMdDoc(docId, docParams).catch((e) => {
      console.error(e);
      Message.error('保存失败');
    });
  }

  function handleContentChange(content: string) {
    setDocDetail({ ...docDetail, content });
    isAutoSave &&
      debounce(() => {
        saveDoc({ content });
      }, 1000)();
  }

  function handleTitleChange(title: string) {
    setDocDetail({ ...docDetail, title });
    isAutoSave &&
      debounce(() => {
        saveDoc({ title });
      }, 1000)();
  }

  async function handleSave() {
    const { title, content } = docDetail || {};

    await saveDoc({ title, content });
    Message.success('保存成功');
  }

  return (
    <div className="md-container">
      <div className="header-toolbar">
        <div className="left">
          {titleEditing ? (
            <Input
              className="title-input"
              autoFocus
              value={docDetail?.title}
              onChange={handleTitleChange}
              onBlur={() => {
                setTitleEditing(false);
              }}
            />
          ) : (
            <div className="title-preview">
              <div className="title">{docDetail?.title}</div>
              <Tooltip content="编辑标题">
                <IconEdit
                  className="title-icon"
                  onClick={() => {
                    setTitleEditing(true);
                  }}
                />
              </Tooltip>
            </div>
          )}
          <div className="updated-time">
            最近修改：
            {dayjs((docDetail?.updatedAt || 0) * 1000).format(
              'YYYY年MM月DD日 HH:mm',
            )}
          </div>
        </div>
        <div className="right">
          {!isAutoSave && (
            <Button type="primary" onClick={handleSave}>
              保存
            </Button>
          )}
          <Checkbox checked={isAutoSave} onChange={setIsAutoSave}>
            自动保存
          </Checkbox>
          {contentEditing ? (
            <Tooltip content="浏览文档">
              <IconEye
                className="preview-icon"
                onClick={() => {
                  setContentEditing(false);
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip content="编辑文档">
              <IconEdit
                className="edit-icon"
                onClick={() => {
                  setContentEditing(true);
                }}
              />
            </Tooltip>
          )}
          <Avatar className="avatar" size={36}>
            <img src={window.userInfo?.avatar} alt="avatar" />
          </Avatar>
        </div>
      </div>

      {contentEditing ? (
        <div className="md-edit-wrapper">
          <div className="edit">
            <Input.TextArea
              className="input"
              value={docDetail?.content}
              onChange={handleContentChange}
            />
          </div>
          <div className="preview">
            <MarkDownRender>{docDetail?.content || ''}</MarkDownRender>
          </div>
        </div>
      ) : (
        <div className="md-preview-wrapper">
          <MarkDownRender className="md-preview">
            {docDetail?.content || ''}
          </MarkDownRender>
        </div>
      )}
    </div>
  );
}
