import { CollDoc } from '@/typings/collDoc';
import { request } from '@/utils/request';

/**
 * 创建文档
 */
export async function createCollDoc(
  params: Partial<CollDoc>,
): Promise<CollDoc> {
  return await request({
    method: 'post',
    url: '/api/coll_doc/create',
    data: params,
  });
}

/**
 * 文档详情
 */
export async function collDocInfoDetail(docId: string): Promise<CollDoc> {
  return await request({
    method: 'post',
    url: '/api/coll_doc/detail',
    data: {
      id: docId,
    },
  });
}

/**
 * 更新文档标题
 */
export async function updateTitle(
  docId: string,
  title?: string,
): Promise<CollDoc> {
  return await request({
    method: 'post',
    url: '/api/coll_doc/updateTitle',
    data: {
      id: docId,
      title,
    },
  });
}

/**
 * 文档列表
 */
export async function getCollDocList(
  filter: Partial<CollDoc>,
): Promise<CollDoc[]> {
  return await request({
    method: 'post',
    url: '/api/coll_doc/search',
    data: {
      filter,
    },
  });
}
