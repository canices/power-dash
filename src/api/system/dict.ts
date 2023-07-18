import { defHttp, formDataHttp } from '/@/utils/http/axios';

enum Api {
  GetDictList = '/dict/page',
  IncreaseDict = '/dict',
  ModifyDict = '/dict',
  DeleteDict = '/dict/', // /dict/{id}
  GetDictByDictCode = '/dict/code/{dictCode}'
}

/**
 * @description: Get dict based on <DictParams>
 */

export function getDictList(params) {
  return formDataHttp.post({ url: Api.GetDictList, params });
}

/**
 * @description: Increase dict based on <DictParams>
 */
export const increaseDict = (params ?: any) => {
  return defHttp.post({ url: Api.IncreaseDict, params })
}

/**
 * @description: Modify dict based on <DictParams>
 */
export const modifyDict = (params) => {
  return defHttp.post({ url: Api.ModifyDict, params})
}

/**
 * @description: Delete dict based on <id>
 */
export function deleteDict(id: number) {
  return defHttp.delete({ url: Api.DeleteDict + id })
}
