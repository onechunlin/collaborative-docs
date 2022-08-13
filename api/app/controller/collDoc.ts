import { Controller, Context } from "egg";
import { CollDoc } from "../../typings/app/controller/collDoc";
import { sleep } from "../utils";
import { type } from "ot-json1";

interface UpdateTitleReq {
  id: string;
  title: string;
}

export default class DocController extends Controller {
  /**
   * 新增接口
   */
  async create(ctx: Context) {
    const { title = "未命名", ...restParams } = ctx.request.body as Omit<
      CollDoc,
      "_id" | "createdAt" | "updatedAt"
    >;
    const { username } = ctx.state.user;
    try {
      const res = await ctx.model.CollDocInfo.create({
        title,
        ...restParams,
        creator: username,
      });
      const { _id: docId } = res;
      const doc = this.app.sharedbDoc(docId.toString());
      // 创建文档 op 快照
      doc.create(
        {
          title: "",
          content: [
            {
              type: "paragraph",
              children: [
                {
                  text: "",
                },
              ],
            },
          ],
        },
        type.name,
        (err) => {
          if (err) {
            throw err;
          }
        }
      );

      // 先睡一秒，确保文档快照创建成功
      await sleep(1000);

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
   * 更新文档标题
   */
  async updateTitle(ctx: Context) {
    const { title = "未命名", id } = ctx.request.body as UpdateTitleReq;
    try {
      const res = await ctx.model.CollDocInfo.findByIdAndUpdate(
        id,
        { title },
        { new: true }
      );

      ctx.body = {
        status: 0,
        msg: "更新成功",
        data: res,
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        msg: "更新失败",
      };
    }
  }

  /**
   * 获取文档信息
   */
  async detail(ctx: Context) {
    const { id } = ctx.request.body;

    try {
      const res = await ctx.model.CollDocInfo.findById(id).lean();
      ctx.body = {
        status: 0,
        msg: "查询成功",
        data: res,
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        msg: "查询失败",
      };
    }
  }

  /**
   * 查找接口
   */
  async search(ctx: Context) {
    const { filter } = ctx.request.body;

    try {
      const res = await ctx.model.CollDocInfo.find(filter).lean();
      ctx.body = {
        status: 0,
        msg: "查询成功",
        data: res,
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        msg: "查询失败",
      };
    }
  }
}
