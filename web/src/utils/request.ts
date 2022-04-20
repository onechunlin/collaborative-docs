import axios, { AxiosRequestConfig } from 'axios';
import { TApiResponse } from '@/typings';

/**
 * 封装获取 cookie 的方法
 */
export function getCookie(name: string): string {
  let res = '';
  document.cookie.split(';')?.forEach((cookieStr) => {
    const [key, value] = cookieStr.split('=');
    if (key === name) {
      res = value;
    }
  });

  return res;
}

/**
 * 统一的请求函数
 */
export function request(config: AxiosRequestConfig): Promise<any> {
  const { headers, ...rest } = config;
  return axios({
    ...rest,
    headers: {
      ...headers,
      'x-csrf-token': getCookie('csrfToken'),
    },
  })
    .then((res) => res.data)
    .then((res) => {
      const { status, msg, data } = res as TApiResponse<any>;
      if (status !== 0) {
        throw Error(msg);
      }
      return data;
    });
}
