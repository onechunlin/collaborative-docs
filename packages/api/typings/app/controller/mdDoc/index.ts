/**
 * 文档结构
 */
export type TMdDoc = {
  /** 文档 id */
  _id: string;
  /** 文档名称 */
  title: string;
  /** 文档创建人 */
  creator: string;
  /** 文档内容 */
  content: string;
  /** 创建时间 unix 时间戳 */
  createdAt: number;
  /** 更新时间 unix 时间戳 */
  updatedAt: number;
};
