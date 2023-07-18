import { defHttp, formDataHttp } from '/@/utils/http/axios';

enum Api {
  GetPostList = '/posts/page',
  IncreasePost = '/posts',
  ModifyPost = '/posts',
  DeletePost = '/posts/', // /posts/{id}
  GetPostByDeptId = '/posts/dept/', // /posts/dept/{deptId}
}

/**
 * @description: Get posts based on <PostParams>
 */

export function getPostList(params) {
  return formDataHttp.post({ url: Api.GetPostList, params });
}

/**
 * @description: Increase posts based on <PostParams>
 */
export const increasePost = (params ?: any) => {
  return defHttp.post({ url: Api.IncreasePost, params })
}

/**
 * @description: Modify posts based on <PostParams>
 */
export const modifyPost = (params) => {
  return defHttp.post({ url: Api.ModifyPost, params})
}

/**
 * @description: Delete posts based on <id>
 */
export function deletePost(id: number) {
  return defHttp.delete({ url: Api.DeletePost + id })
}

/**
 * @description: Get posts based on <deptId>
 */
export function getPostByDept(deptId : number) {
  deptId = deptId || 0
  return defHttp.get({ url: Api.GetPostByDeptId + deptId })
}
