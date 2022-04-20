/** Api 接口的返回值 */
export type TApiResponse<T> = {
  status: number;
  msg: string;
  data?: T;
};
