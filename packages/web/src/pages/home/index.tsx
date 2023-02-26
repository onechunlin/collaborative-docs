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
import { createMdDoc, searchMdDoc } from '@/services/mdDoc';
import { EDocType, TMdDoc } from '@/typings/mdDoc';
import { createCollDoc, getCollDocList } from '@/services/collDoc';
import { CollDoc } from '@/typings/collDoc';
import './index.less';

const { Item: ListItem } = List;
const { Group: RadioGroup } = Radio;
const { Item: FormItem, useForm } = Form;

export default function Home() {
  const history = useHistory();
  const [docs, setDocs] = useState<(TMdDoc | CollDoc)[]>();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [docType, setDocType] = useState<EDocType>(EDocType.CollDocs);

  const [form] = useForm();

  useEffect(() => {
    let searchService;
    switch (docType) {
      case EDocType.MarkDown:
        searchService = searchMdDoc;
        break;
      case EDocType.CollDocs:
        searchService = getCollDocList;
        break;
      default:
        return;
    }
    searchService({})
      .then((res) => setDocs(res))
      .finally(() => {
        setLoading(false);
      });
  }, [docType]);

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

  async function handleCreateCollDoc() {
    try {
      const { _id: docId } = await createCollDoc({});
      history.push(`/coll_doc/${docId}`);
    } catch (error) {
      Message.error('创建失败');
      console.error(error);
    }
  }

  function handleEditDoc(docId: string) {
    let url = '';
    switch (docType) {
      case EDocType.MarkDown:
        url = `/md_edit/${docId}`;
        break;
      case EDocType.CollDocs:
        url = `/coll_doc/${docId}`;
        break;
      default:
        return;
    }
    window.open(url);
  }

  return (
    <div className='home-container'>
      <div className='header-container'>
        <Avatar size={36}>
          <img src={window.userInfo?.avatar} alt='avatar' />
        </Avatar>
      </div>
      <div className='main-title-and-create'>
        <span className='main-title'>主页</span>

        <Dropdown
          position='br'
          trigger='click'
          droplist={
            <Menu>
              <Menu.Item key={EDocType.CollDocs} onClick={handleCreateCollDoc}>
                协同文档
              </Menu.Item>
              <Menu.Item key={EDocType.MarkDown} onClick={openModal}>
                MarkDown
              </Menu.Item>
            </Menu>
          }>
          <Button type='primary'>新建</Button>
        </Dropdown>
      </div>
      <div className='banner'>
        <div className='left'>
          <p className='title'>好记性不如烂笔头，写个文档记录一下吧!</p>
          <p className='desc'>
            人生要用简单的心境，对待复杂的人生，最无情的不是人，是时间；最珍贵的不是金钱，是情感；最可怕的不是失恋，是心身不全；最舒适的不是酒店，是家里；最难听的不是脏话，是无言；最美好的不是未来，是今天。
          </p>
        </div>
        <div className='right'>
          <img
            className='banner-img'
            src={require('@/assets/banner.png')}
            alt=''
          />
        </div>
      </div>
      <div className='recent-list'>
        <div className='recent-header'>
          <span className='title'>最近访问</span>
          <RadioGroup
            value={docType}
            onChange={setDocType}
            options={[
              {
                label: 'Markdown',
                value: EDocType.MarkDown,
              },
              {
                label: '协同文档',
                value: EDocType.CollDocs,
              },
            ]}></RadioGroup>
        </div>
        <div className='list-title row'>
          <span>文档名称</span>
          <span>文档所有人</span>
          <span>更新时间</span>
        </div>
        <Spin loading={loading} block>
          <List
            dataSource={docs}
            wrapperClassName='list'
            render={(item, index) => (
              <ListItem
                key={index}
                className='list-item'
                onClick={() => handleEditDoc(item._id)}>
                <div className='row'>
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
            )}></List>
        </Spin>
      </div>
      <Modal
        title='文档信息'
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleCreateMdDoc}
        unmountOnExit>
        <Form form={form}>
          <FormItem
            label='文档标题'
            field='title'
            rules={[{ required: true, message: '请输入文档标题' }]}>
            <Input placeholder='请输入' />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}
