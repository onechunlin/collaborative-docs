import { Controller, Context } from "egg";
import path =  require("path");
import { nanoid } from 'nanoid';

export default class FileController extends Controller {
  /**
   * 文件上传
   */
  async upload(ctx: Context) {
    const stream = await this.ctx.getFileStream();
    const fileId = nanoid();
    const filename = fileId + path.extname(stream.filename).toLowerCase();
    ctx.app.logger.info("[file controller] upload filename = %s", filename);
    const res = await ctx.service.file.upload(filename, stream);
    if(res){
      ctx.body = {
        status: 0,
        msg: "",
        data: res,
       };
    } else {
      ctx.body = {
        status: -1,
        msg: "uplodFileError",
       };
    }
  }
}
