import { Service } from "egg";
import { TMdDoc } from "../../typings/app/controller/mdDoc";

export default class MdDoc extends Service {
  /**
   * 创建文档
   */
  public async create(params: TMdDoc): Promise<TMdDoc> {
    const res = await this.ctx.model.MarkdownDoc.create(params);
    return res;
  }

  /**
   * 更新文档
   */
  public async update(id, params: Partial<TMdDoc>): Promise<TMdDoc> {
    const res = await this.ctx.model.MarkdownDoc.updateOne(
      { _id: id },
      params,
      { new: true }
    );
    return res;
  }

  /**
   * 查找文档
   */
  public async search(filter: Partial<TMdDoc>): Promise<TMdDoc[]> {
    const res = await this.ctx.model.MarkdownDoc.find(filter).lean();
    return res;
  }

  /**
   * 查找详情
   */
  public async detail(id: string): Promise<TMdDoc> {
    const res = await this.ctx.model.MarkdownDoc.findById(id).lean();
    return res;
  }
}
