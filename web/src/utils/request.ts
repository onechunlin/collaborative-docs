import axios, {AxiosRequestConfig} from 'axios';
import { TApiResponse } from '@/typings';

/**
 * 统一的请求函数
 */
export function request(config: AxiosRequestConfig): Promise<any> {
  return axios(config)
  .then(res => res.data)
  .then(res => {
    const { status, msg, data } = res as TApiResponse<any>;
    if(status !== 0) {
      throw Error(msg);
    }
    return data;
  });
}
