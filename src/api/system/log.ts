import { formDataHttp } from '/@/utils/http/axios';

enum Api {
  GetLoginLog = '/log/loginLog/page',
  GetOperateLog = '/log/operLog/page',
}

/**
 * @description: Get login-log based on <LogParams>
 */

export function getLoginLogList(params) {
  return formDataHttp.post({ url: Api.GetLoginLog, params });
}

/**
 * @description: Get operate-log based on <LogParams>
 */

export function getOperateLogList(params) {
  return formDataHttp.post({ url: Api.GetOperateLog, params });
}
