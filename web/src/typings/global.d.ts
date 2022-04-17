interface Window {
    userInfo: {
      /** 用户名 */
      username: string;
      /** 头像 */
      avatar?: string;
    };
    md5: (value: string, token?: string) => string;
}
