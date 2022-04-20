import { Controller, Context } from "egg";
import { TDoc } from "../../typings/app/controller/doc";

export default class DocController extends Controller {
  /**
   * 新增接口
   */
  async create(ctx: Context) {
    const { title = "未命名", ...restParams } = ctx.request
      .body as Partial<TDoc>;

    try {
      const res = await ctx.model.Doc.create({
        title,
        ...restParams,
      });
      ctx.body = {
        status: 0,
        msg: "创建成功",
        data: res,
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        msg: "创建失败",
      };
    }
  }

  /**
   * 删除接口
   */
  async delete(ctx: Context) {
    const { id } = ctx.request.body;

    try {
      await ctx.model.Doc.findByIdAndRemove(id);
      ctx.body = {
        status: 0,
        msg: "删除成功",
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        msg: "删除失败",
      };
    }
  }
}
