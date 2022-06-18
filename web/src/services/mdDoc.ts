import { TMdDoc } from '@/typings/mdDoc';
import { request } from '@/utils/request';

/**
 * 创建文档
 */
export function createMdDoc(params: Partial<TMdDoc>): Promise<TMdDoc> {
  return request({
    method: 'post',
    url: '/api/md_doc/create',
    data: {
      params: {
        title: '未命名',
        ...params,
        creator: window.userInfo.username,
      },
    },
  });
}

/**
 * 文档详情
 */
export function getMdDocDetail(docId: string): Promise<TMdDoc> {
  return request({
    method: 'post',
    url: '/api/md_doc/detail',
    data: {
      id: docId,
    },
  });
}

/**
 * 查找文档
 */
export function updateMdDoc(id: string, mdDoc: Partial<TMdDoc>): Promise<TMdDoc> {
  return request({
    method: 'post',
    url: '/api/md_doc/update',
    data: {
      id,
      params: mdDoc,
    },
  });
}

/**
 * 查找文档
 */
export function searchMdDoc(): Promise<TMdDoc[]> {
  return request({
    method: 'post',
    url: '/api/md_doc/search',
  });
}
