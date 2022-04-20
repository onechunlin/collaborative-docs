module.exports = (app) => {
  class Controller extends app.Controller {
    async disconnect() {
      const message = this.ctx.args[0];
      console.log(
        "🚀 ~ file: doc.ts ~ line 16 ~ Controller ~ disconnect ~ message",
        message
      );
    }
    async connection() {
      const message = this.ctx.args[0];
      console.log(
        "🚀 ~ file: doc.ts ~ line 12 ~ Controller ~ connect ~ message",
        message
      );
    }
    async detail() {
      const docId = this.ctx.args[0];
      console.log(
        "🚀 ~ file: doc.ts ~ line 20 ~ Controller ~ chat ~ this.ctx.state",
        docId
      );
    }
  }
  return Controller;
};
