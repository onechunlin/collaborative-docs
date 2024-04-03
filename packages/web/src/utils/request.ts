import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '@/typings';
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
export async function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  const res = await axios(config);
  const { status, msg, data } = res.data as ApiResponse<T>;
  if (status !== 0) {
    throw new Error(msg);
  }
  return data;
}
