import { request } from '@/utils/request';

type TLogin = {
  username: string;
  password: string;
};
export function login(params: TLogin): Promise<void> {
  const { password, ...rest } = params;
  return request({
    method: 'post',
    url: '/api/user/login',
    data: {
      ...rest,
      password: window.md5(password),
    },
  });
}

type TRegister = {
  username: string;
  password: string;
  phoneNumber: number;
};
export function register(params: TRegister): Promise<void> {
  const { password, ...rest } = params;

  return request({
    method: 'post',
    url: '/api/user/register',
    data: {
      ...rest,
      password: window.md5(password),
    },
  });
}

/**
 * 获取 sessionId，用于 websocket 鉴权
 */
export function getToken(): Promise<{ token: string }> {
  return request({
    method: 'get',
    url: '/api/user/getToken',
  });
}
