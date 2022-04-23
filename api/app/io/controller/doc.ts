import { applyPatches, enablePatches } from "immer";
import { TDoc } from "../../../typings/app/controller/doc";
import { TUpdate } from "../../../typings/app/io/controller/doc";
enablePatches();

module.exports = (app) => {
  class Controller extends app.Controller {
    async disconnect() {
      console.log("%s 断开链接", this.ctx.socket.id);
    }

    async detail() {
      const docId = this.ctx.args[0];
      const res = await this.ctx.model.Doc.findById(docId).lean();
      // 加入文档的房间
      this.ctx.socket.join(docId);
      this.ctx.socket.emit("detail", res);
    }

    async update() {
      const { docId, changes } = this.ctx.args[0] as TUpdate;
      const res = (await this.ctx.model.Doc.findById(docId).lean()) as TDoc;
      const { _id } = res;
      const newDoc = applyPatches(res, changes);
      await this.ctx.model.Doc.findOneAndUpdate({ _id }, newDoc);

      // 给对应房间进行广播
      this.ctx.socket.to(docId).broadcast.emit("update", changes);
    }
  }
  return Controller;
};
