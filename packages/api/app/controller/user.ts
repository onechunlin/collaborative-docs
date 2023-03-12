import { Controller, Context } from "egg";
import { pick } from "lodash";
import { TUserInfo } from "../../typings/app/controller/user";
import { DEFAULT_AVATAR, NO_NEED_LOGIN_PATH } from "../constants";

export default class UserController extends Controller {
  /**
   * 返回用户信息脚本，若已登录则返回用户信息，否则跳转到登录页面
   */
  async userInfo(ctx: Context) {
    const userInfo = ctx.service.user.getUserInfo();

    ctx.response.set("Content-Type", "application/javascript");
    if (userInfo) {
      ctx.body = `window.userInfo = ${JSON.stringify(userInfo)}`;
      return;
    }
    const { referer } = ctx.request.header;
    const noNeedLogin = NO_NEED_LOGIN_PATH.find((path) =>
      (referer as string).match(path)
    );
    ctx.body = noNeedLogin ? "" : 'location.href="/login"';
  }

  /**
   * 登录接口
   */
  async login(ctx: Context) {
    const { username, password } = ctx.request.body as Pick<
      TUserInfo,
      "username" | "password"
    >;

    // 查询帐号是否存在
    const existUserName = await ctx.service.user.existUserName(username);

    if (existUserName) {
      // 如果用户名存在则检查密码是否正确
      const res = await ctx.model.User.findOne({ username }).lean();
      const { password: rightPassword } = res;
      if (password === rightPassword) {
        const userInfo = pick(res, "username", "avatar");
        // 生成签名
        const token = this.app.jwt.sign(userInfo, this.app.config.jwt.secret, {
          expiresIn: "7d",
        });
        ctx.cookies.set("token", token);
        ctx.body = {
          status: 0,
          msg: "登录成功",
        };
        return;
      }

      ctx.body = {
        status: 400,
        msg: "密码错误",
      };
      return;
    }

    ctx.body = {
      status: 400,
      msg: "帐号不存在",
    };
  }

  /**
   * 退出登录接口
   */
  async logout(ctx: Context) {
    const { session } = ctx;
    if (session) {
      ctx.session = null;
      ctx.body = {
        status: 0,
        msg: "退出成功",
      };
    }
  }

  /**
   * 注册接口
   */
  async register(ctx: Context) {
    const { username, password, phoneNumber } = ctx.request.body;

    // 查询帐号是否存在
    const existUserName = await ctx.service.user.existUserName(username);

    if (existUserName) {
      ctx.body = {
        status: 500,
        msg: "帐号已存在",
      };
      return;
    }

    try {
      await ctx.model.User.create({
        username,
        password,
        phoneNumber,
        avatar: DEFAULT_AVATAR,
      });
      ctx.body = {
        status: 0,
        msg: "注册成功",
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        msg: "注册失败",
      };
    }
  }

  async getToken(ctx: Context) {
    const token = ctx.cookies.get("token") || ctx.headers.token;
    ctx.body = {
      status: 0,
      msg: "ok",
      data: {
        token,
      },
    };
  }
}
