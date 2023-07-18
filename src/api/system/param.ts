import { defHttp, formDataHttp } from '/@/utils/http/axios';

enum Api {
  GetParamList = '/param/page',
  IncreaseParam = '/param',
  ModifyParam = '/param',
  DeleteParam = '/param/', // /param/{id}
  GetParamByParamCode = '/param/code/{paramCode}'
}

/**
 * @description: Get param based on <ParamParams>
 */

export function getParamList(params ?: any) {
  return formDataHttp.post({ url: Api.GetParamList, params });
}

/**
 * @description: Increase param based on <ParamParams>
 */
export const increaseParam = (params ?: any) => {
  return defHttp.post({ url: Api.IncreaseParam, params })
}

/**
 * @description: Modify param based on <ParamParams>
 */
export const modifyParam = (params) => {
  return defHttp.post({ url: Api.ModifyParam, params})
}

/**
 * @description: Delete param based on <id>
 */
export function deleteParam(id: number) {
  return defHttp.delete({ url: Api.DeleteParam + id })
}
