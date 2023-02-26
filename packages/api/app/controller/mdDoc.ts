import { Controller, Context } from "egg";
import { TMdDoc } from "../../typings/app/controller/mdDoc";

export default class MdDocController extends Controller {
  /**
   * 新增接口
   */
  async create(ctx: Context) {
    const { params } = ctx.request.body;

    try {
      const res = await ctx.service.mdDoc.create(params as TMdDoc);
      ctx.body = {
        status: 0,
        msg: "创建成功",
        data: res,
      };
    } catch (error) {
      console.error(error);
      ctx.body = {
        status: 500,
        msg: "创建失败",
      };
    }
  }

  /**
   * 查找接口
   */
  async search(ctx: Context) {
    const { filter } = ctx.request.body;

    try {
      const res = await ctx.service.mdDoc.search(filter);
      ctx.body = {
        status: 0,
        msg: "查询成功",
        data: res,
      };
    } catch (error) {
      console.error(error);

      ctx.body = {
        status: 500,
        msg: "查询失败",
      };
    }
  }

  /**
   * 更新接口
   */
  async update(ctx: Context) {
    const { id, params } = ctx.request.body;

    try {
      const res = await ctx.service.mdDoc.update({ _id: id }, params);
      ctx.body = {
        status: 0,
        msg: "更新成功",
        data: res,
      };
    } catch (error) {
      console.error(error);

      ctx.body = {
        status: 500,
        msg: "更新失败",
      };
    }
  }

  /**
   * 详情接口
   */
  async detail(ctx: Context) {
    const { id } = ctx.request.body;

    try {
      const res = await ctx.service.mdDoc.detail(id);
      ctx.body = {
        status: 0,
        msg: "查询成功",
        data: res,
      };
    } catch (error) {
      console.error(error);

      ctx.body = {
        status: 500,
        msg: "查询失败",
      };
    }
  }
}
