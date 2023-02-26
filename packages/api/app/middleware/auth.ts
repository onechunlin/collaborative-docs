import { Context } from "egg";

module.exports = () => {
  return async function jwt(ctx: Context, next) {
    const token = ctx.cookies.get("token") || ctx.headers.token || "";
    try {
      // 解码token
      const userInfo = (ctx.app as any).jwt.verify(
        token,
        ctx.app.config.jwt.secret
      );
      ctx.state.user = userInfo;
      await next();
    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        message: "token 失效或解析错误",
      };
      return;
    }
  };
};
