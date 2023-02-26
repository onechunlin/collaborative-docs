import { Context } from "egg";

module.exports = () => {
  return async function jwt(ctx: Context, next) {
    try {
      await next();
    } catch (error) {
      ctx.logger.error(`server error, full error message is:
      ${JSON.stringify(error)}
      `);
      ctx.body = {
        status: 500,
        msg: "server error",
      };
    }
  };
};
