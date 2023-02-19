import { Service } from "egg";
import { FILE_DOMAIN } from "../constants";
import { ossClientFactory } from "../utils/oss";

export default class File extends Service {
  /**
   * 将文件流上传到云存储
   * @param filename 文件名
   * @param stream 文件可读流 
   */
  public async upload(filename: string, stream: any) {
    const ossClient = ossClientFactory(this.app);
    const timestamp = Date.now();
    const filePath = `/co-docs/${timestamp}/${filename}`;
    const uploadRes =  await ossClient?.putStream(filePath, stream).catch(error=> {
      this.ctx.app.logger.error('[service file upload] oss uploa error %o', error)
    });
    if(!uploadRes){
      return null
    }
    const ossFileName = uploadRes.name;
    const ossFileUrl = `${FILE_DOMAIN}/${ossFileName}`;
    if(uploadRes.res?.status === 200 && ossFileName){
      return {
        name: ossFileName,
        url: ossFileUrl
      }
    }
    return null;
  } 
}