/**
 * 节点类型
 */
export enum EType {
  /** 普通文本 */
  Text = 'text',
  /** 加粗文本 */
  BoldText = 'bold_text',
  /** 图片 */
  Image = 'image',
}

/**
 * 存储节点结构
 */
export type TNode = {
  /** 节点类型 */
  type: EType;
  /** 子节点 */
  children?: TNode[] | string;
  /** 当前节点编辑人 */
  editingUser?: string;
  /** 节点属性 */
  attributes?: Record<string, string>;
};

/**
 * 文档结构
 */
export type TDoc = {
  /** 文档 id */
  _id: string;
  /** 文档名称 */
  title: string;
  /** 文档创建人 */
  creator: string;
  /** 文档内容 */
  content: TNode[];
  /** 当前文档信息编辑人 */
  editingUser?: string;
  /** 创建时间 unix 时间戳 */
  createdAt: number;
  /** 更新时间 unix 时间戳 */
  updatedAt: number;
};
