/**
 * 用户信息
 */
export type TUserInfo = {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 电话号码 */
  phoneNumber: number;
  /** 头像 */
  avatar?: string;
}

/** Api 接口的返回值 */
export type TApiResponse<T> = {
  status: number;
  msg: string;
  data?: T;
}
