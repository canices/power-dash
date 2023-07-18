import { defHttp, formDataHttp } from '/@/utils/http/axios';

import { GetUserByDeptParams } from './model/userModel'

enum Api {
  GetUserList = '/dept/user/page',
  IncreaseUser = '/sysUser/saveUser',
  ModifyUser = '/sysUser/updateUser',
  DeleteUser = '/sysUser/', // /sysUser/{id}
  ModifyPassword = '/user/password',
  GetUserMenu = '/user/menu',
  GetCaptcha = '/captcha/get',
  CheckCaptcha = '/captcha/check',
}

/**
 * @description: Get user based on <UserParams>
 */

export function getUserList(params) {
  // if(params.deptId == null || params.deptId == 'undefined') {
  //   params.deptId = 0
  // }
  console.log('-----------')
  console.log(params)
  return formDataHttp.post({ url: Api.GetUserList, params });
}

/**
 * @description: Increase user based on <ParamParams>
 */
export const increaseUser = (params ?: any) => {
  return defHttp.post({ url: Api.IncreaseUser, params })
}

/**
 * @description: Modify user based on <ParamParams>
 */
export const modifyUser = (params) => {
  return defHttp.post({ url: Api.ModifyUser, params})
}

/**
 * @description: Delete user based on <id>
 */
export function deleteUser(userId: number) {
  return defHttp.delete({ url: Api.DeleteUser + userId })
}

/**
 * @description: Modify password based on <ModifyPasswordModal>
 */
export function modifyPassword(params) {
  return defHttp.post({ url: Api.ModifyPassword, params })
}

/**
 * @description: Get captcha based on <CaptchaModal>
 */
export function getCaptcha(params) {
  return defHttp.post({ url: Api.GetCaptcha, params })
}

/**
 * @description: Check captcha based on <CaptchaModal>
 */
export function checkCaptcha(params) {
  return defHttp.post({ url: Api.CheckCaptcha, params })
}
