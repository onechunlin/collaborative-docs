import { Context } from "egg";

module.exports = () => {
  return async function responseTime(ctx: Context, next) {
    const userInfo = ctx.service.user.getUserInfo();

    if (!userInfo) {
      ctx.socket.emit("disconnect", "token 失效或解析错误");
      return;
    }
    await next();
  };
};
