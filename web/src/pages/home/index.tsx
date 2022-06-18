import { createDoc, searchDoc } from '@/services';
import { TDoc } from '@/typings/doc';
import {
  Button,
  Avatar,
  List,
  Message,
  Spin,
  Dropdown,
  Menu,
  Modal,
  Form,
  Radio,
  Input,
} from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import './index.less';
import { createMdDoc, searchMdDoc } from '@/services/mdDoc';
import { EDocType, TMdDoc } from '@/typings/mdDoc';

const { Item: ListItem } = List;
const { Group: RadioGroup } = Radio;
const { Item: FormItem, useForm } = Form;

export default function Home() {
  const history = useHistory();
  const [docs, setDocs] = useState<(TDoc | TMdDoc)[]>();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [docType, setDocType] = useState<EDocType>(EDocType.MarkDown);

  const [form] = useForm();

  useEffect(() => {
    const searchService =
      docType === EDocType.MarkDown ? searchMdDoc : searchDoc;

    searchService()
      .then((res) => setDocs(res))
      .finally(() => {
        setLoading(false);
      });
  }, [docType]);

  function handleCreateDoc() {
    createDoc({})
      .then((res) => {
        const { _id: docId } = res;
        history.push(`/edit/${docId}`);
      })
      .catch((e: Error) => {
        Message.error(e.message || '创建失败');
        console.error(e);
      });
  }

  function openModal() {
    setVisible(true);
  }

  async function handleCreateMdDoc() {
    try {
      await form.validate();
      const title = form.getFieldValue('title');
      const res = (await createMdDoc({ title })) as TMdDoc;
      history.push(`/md_edit/${res._id}`);
    } catch (error) {
      Message.error('创建失败');
    }
  }

  function handleEditDoc(docId: string) {
    window.open(
      docType === EDocType.Docs ? `/edit/${docId}` : `/md_edit/${docId}`,
    );
  }

  return (
    <div className="home-container">
      <div className="header-container">
        <Avatar size={36}>
          <img src={window.userInfo?.avatar} alt="avatar" />
        </Avatar>
      </div>
      <div className="main-title-and-create">
        <span className="main-title">主页</span>

        <Dropdown
          position="br"
          trigger="click"
          droplist={
            <Menu>
              <Menu.Item key="md" onClick={openModal}>
                MarkDown
              </Menu.Item>
              <Menu.Item key="doc" onClick={handleCreateDoc} disabled>
                文档 2.0
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="primary">新建</Button>
        </Dropdown>
      </div>
      <div className="banner">
        <div className="left">
          <p className="title">好记性不如烂笔头，写个文档记录一下吧!</p>
          <p className="desc">
            人生要用简单的心境，对待复杂的人生，最无情的不是人，是时间；最珍贵的不是金钱，是情感；最可怕的不是失恋，是心身不全；最舒适的不是酒店，是家里；最难听的不是脏话，是无言；最美好的不是未来，是今天。
          </p>
        </div>
        <div className="right">
          <img
            className="banner-img"
            src={require('@/assets/banner.png')}
            alt=""
          />
        </div>
      </div>
      <div className="recent-list">
        <div className="recent-header">
          <span className="title">最近访问</span>
          <RadioGroup
            value={docType}
            onChange={setDocType}
            options={[
              {
                label: 'Markdown',
                value: EDocType.MarkDown,
              },
              {
                label: '文档 2.0',
                value: EDocType.Docs,
              },
            ]}
          ></RadioGroup>
        </div>
        <div className="list-title row">
          <span>文档名称</span>
          <span>文档所有人</span>
          <span>更新时间</span>
        </div>
        <Spin loading={loading} block>
          <List
            dataSource={docs}
            wrapperClassName="list"
            render={(item, index) => (
              <ListItem
                key={index}
                className="list-item"
                onClick={() => handleEditDoc(item._id)}
              >
                <div className="row">
                  <span>
                    <img
                      src={require('@/assets/doc.svg')}
                      style={{ marginRight: 12 }}
                    />
                    {item.title}
                  </span>
                  <span>{item.creator}</span>
                  <span>
                    {dayjs(item.updatedAt * 1000).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                </div>
              </ListItem>
            )}
          ></List>
        </Spin>
      </div>
      <Modal
        title="文档信息"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleCreateMdDoc}
        unmountOnExit
      >
        <Form form={form}>
          <FormItem
            label="文档标题"
            field="title"
            rules={[{ required: true, message: '请输入文档标题' }]}
          >
            <Input placeholder="请输入" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}
