import ShareDB, { MemoryDB } from "sharedb";
import WebSocket from "ws";
import { type as json1Type } from "ot-json1";
// @ts-ignore
import WebSocketJSONStream from "@teamwork/websocket-json-stream";
import { parse as parseUrl } from "url";
import qs from "qs";

export interface ShareDbOptions {
  /** 是否启动在场功能，即当前连接用户 */
  presence: boolean;
}

export interface ShareServerOptions {
  /** 启动端口 */
  port: number;
  /** ShareDb 的配置 */
  shareDbOptions: ShareDbOptions;
}

export interface ServerConfig {
  backend: ShareDB;
  /** 启动端口 */
  port: number;
  /** 集合名称，即表名 */
  collectionName: string;
}

const DEFAULT_OPTIONS: ShareServerOptions = {
  port: 8080,
  shareDbOptions: {
    presence: true,
  },
};

export function initServer(serverOptions?: ShareServerOptions) {
  const { port, shareDbOptions } = serverOptions || DEFAULT_OPTIONS;
  // 注册 json1 类型
  ShareDB.types.register(json1Type);
  const { presence } = shareDbOptions;

  // 创建 sharedb 实例
  const backend = new ShareDB({
    presence,
    db: new MemoryDB(),
  });

  const connection = backend.connect();

  // 创建 websocket 服务器
  const wss = new WebSocket.Server({ port }, () => {
    console.log(`websocket server listening on http://localhost:${port}`);
  });

  // 监听 connection 事件
  wss.on("connection", function (ws, request) {
    const query = parseUrl(request.url || "").query || "";
    const docId = qs.parse(query).docId as string;
    if (!docId) {
      return;
    }
    // 获取对应集合 ID 的文档
    const doc = connection.get("collDoc", docId);
    // 获取 doc 的数据
    doc.fetch(function (err) {
      if (err) throw err;
      // 如果该记录不存在的话
      if (doc.type === null) {
        doc.create(
          [
            {
              type: "paragraph",
              children: [
                {
                  text: "",
                },
              ],
            },
          ],
          json1Type.name
        );
        return;
      }
    });

    // 将 websocket 的包打成 JSON 流
    const stream = new WebSocketJSONStream(ws);
    // 监听 stream 的错误
    stream.on("error", (err: Error) => {
      console.error("stream error: %o", err);
    });
    // ShareDb 服务器监听该 Stream
    backend.listen(stream);
  });
}
