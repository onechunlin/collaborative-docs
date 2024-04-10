export interface ApiResponse<T = any> {
  status: number;
  msg: string;
  data: T;
}

/**
 * 文档结构
 */
export interface CollDoc {
  /** 文档 id */
  _id: string;
  /** 文档名称 */
  title: string;
  /** 文档创建人 */
  creator: string;
  /** 创建时间 unix 时间戳 */
  createdAt: number;
  /** 更新时间 unix 时间戳 */
  updatedAt: number;
}
