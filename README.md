# collaborative-docs

## 写在前面

兴趣驱使的项目，通过整个项目完整跑下来能够比较全面的将前端的知识体系过一遍，还会涉及到一些服务端的知识，如 Mongo 等。因为是个人项目，稳定性等尚缺实践，大家如果发现有什么问题的话欢迎提 PR 呀

## 简介

在线协同编辑文档，前端富文本编辑器号称前端的”清华“哦。写累了简单的业务代码，所以利用空余时间准备搞一些感兴趣的事情啦~

## 技术简介

> 详细技术方案可以[看这里](https://www.yuque.com/u29154913/ilyggm/he3omk)，还没写完，后续慢慢补充

- 协同算法：在主流的 OT 和 CRDT 之间纠结了很久最终选择了 **OT** 实现。目前成熟的 OT 开源方案有 ShareDB，成熟的 CRDT 的方案有 Yjs，两者各有优劣（对协同编辑不了解的可以看看[这篇文章](https://juejin.cn/post/7030327005665034247)，作者讲的很不错）。
- 冲突解决：使用 ottypes-json1 来解决冲突问题
- 前端编辑器：Slate。代码中还有初始版本的 Quill 实现的小 Demo，但是最后发现使用很受限，后续应该会清理掉。
- 版本控制、在线处理等：ShareDB。在 OT 这块比较成熟的方案。
- 用户鉴权：考虑到之后 WebSocket 的鉴权，所以采用 JWT 的方式来进行用户鉴权。
- 底层存储：MongoDB，Redis（还没用上）。采用 Docker 部署，暂时放在本地。

## 实现进度

1. ✅ 用户登录注册
2. ✅ 文档新建、列表，细节待完善
3. ✅ 基础的 MarkDown 编辑器（练手用的）
4. ✅ 协同文档的基本输入协同
5. ✅ 字体大小、字体颜色、背景色、对齐等样式协同
6. ✅ 分割线组件
7. ✅ 用户在线光标
8. 【进行中】其他能力...（最近比较忙，暂时停止更新，待后续技术储备更多之后会再次检查整体架构再继续）

## 效果演示

目前的效果展示，[点此查看](./%E6%95%88%E6%9E%9C%E5%B1%95%E7%A4%BA.gif)

## 环境准备

1. 首先得本地安装 Docker Desktop，安装请参考 [Docker 官网](https://docs.docker.com/compose/gettingstarted/)
2. v12 <= Node <= v16
3. npm or yarn（推荐 yarn）

## 工程目录

- **packages/api:** API 目录，登录、注册、文档列表等接口
- **packages/os-server:** 本地的简易对象存储服务器，用于存储图片、视频等数据
- **packages/share-server:** 基于 ShareDB 的 WebSocket 服务器，用于 OT 的流程控制、协同管理等
- **packages/web:** 前端工程，登录、注册、文档编辑等页面。

## 项目启动

API 启动

```bash
cd packages/api
yarn
yarn dev
```

Share DB 服务器启动

```bash
cd packages/share-server
yarn
yarn dev
```

对象存储服务器启动

```bash
cd packages/os-server
yarn
yarn dev
```

前端启动

```bash
cd packages/web
yarn
yarn dev
```

然后访问 localhost:8000 查看效果
