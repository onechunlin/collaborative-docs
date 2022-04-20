import { Service } from "egg";
import { TUserInfo } from "../../typings/app/controller/user";

export default class User extends Service {
  /**
   * 检查用户名是否存在
   */
  public async existUserName(username: string): Promise<boolean> {
    const rsp = await this.ctx.model.User.find({ username });
    if (rsp.length > 0) {
      return true;
    }
    return false;
  }

  /**
   * 封装获取 cookie 的方法
   */
  public getCookie(name: string, cookies?: string): string {
    let res = "";
    cookies?.split(";")?.forEach((cookieStr) => {
      const [key, value] = cookieStr.split("=");
      // 不知道为啥 sid 前有个空格，先 trim 一下
      if (key.trim() === name) {
        res = value;
      }
    });

    return res;
  }

  /**
   * 封装获取 cookie 的方法
   */
  public getUserInfo(): TUserInfo | undefined {
    if (this.ctx.state.user) {
      return this.ctx.state.user;
    }
    const token =
      this.ctx.cookies.get("token") ||
      this.ctx.headers.token ||
      this.ctx.query.token;
    try {
      // 解码token
      const userInfo = (this.app as any).jwt.verify(
        token,
        this.app.config.jwt.secret
      );
      return userInfo;
    } catch (error) {}
  }
}
