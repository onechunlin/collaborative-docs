import { Request, Response } from "express-serve-static-core";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";

export interface BaseResp<T = any> {
  status: number;
  msg: string;
  data?: T;
}
export function uploadObject(req: Request, res: Response) {
  const contentType = req.headers["content-type"];
  if (!contentType) {
    throw new Error("请指定有效的 Content-Type 值！");
  }
  const extension = mime.extension(contentType);
  const uri = `${uuidv4()}.${extension}`;
  const stream = fs.createWriteStream(`./source/${uri}`);
  req.on("data", (chunk) => {
    stream.write(chunk);
  });

  req.on("end", () => {
    stream.end();
    res.send({
      status: 0,
      msg: "图片上传成功",
      data: {
        uri,
      },
    } as BaseResp<{ uri: string }>);
  });
  stream.on("error", (err) => {
    console.log(err);
    throw new Error("图片上传失败");
  });
}

export function getObject(res: Response, objectKey: string) {
  const stream = fs.createReadStream(`./source/${objectKey}`);
  stream.on("data", (chunk) => {
    res.write(chunk);
  });
  stream.on("end", () => {
    res.end();
  });
  stream.on("error", (err) => {
    console.log(err);
    throw new Error("图片读取失败");
  });
}
