import { createDoc } from '@/services';
import { Button, Avatar, List, Message } from '@arco-design/web-react';
import { useHistory } from 'react-router-dom';
import './index.less';

const { Item: ListItem } = List;
const mockData = [
  {
    title: '这是文档标题1',
    creator: 'wangchunlin',
    updateAt: '2022-04-17T08:21:45.347+00:00',
  },
  {
    title: '这是文档标题2',
    creator: 'wangchunlin',
    updateAt: '2022-04-17T08:21:45.347+00:00',
  },
];
export default function Home() {
  const history = useHistory();

  function handleCreateDoc() {
    createDoc({}).then(res => {
      const { _id: docId } = res;
      history.push(`/edit/${docId}`);
    }).catch((e: Error) => {
      Message.error(e.message || '创建失败');
      console.error(e);
    });
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
        <Button type="primary" onClick={handleCreateDoc}>新建</Button>
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
        <span className="title">最近访问</span>
        <div className="list-title row">
          <span>文档名称</span>
          <span>文档所有人</span>
          <span>更新时间</span>
        </div>
        <List
          dataSource={mockData}
          wrapperClassName="list"
          render={(item) => (
            <ListItem className="list-item">
              <div className="row">
                <span>
                  <img
                    src={require('@/assets/doc.svg')}
                    style={{ marginRight: 12 }}
                  />
                  {item.title}
                </span>
                <span>{item.creator}</span>
                <span>{item.updateAt}</span>
              </div>
            </ListItem>
          )}
        ></List>
      </div>
    </div>
  );
}
