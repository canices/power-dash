import { defHttp } from '/@/utils/http/axios';
import { SysRoleAuthList, SysRoleListRes } from './model/roleModel';

enum Api {
  GetRoleList = '/sysRole/get',
  GetSysRoleList = '/sysRole/get',
  GetSysRoleAuth = '/sysRoleMenu/', // /sysRoleMenu/{rid}
  IncreaseRole = '/sysRole',
  ModifyRole = '/sysRole',
  DeleteRole = '/deleteRole',
  GrantPermission = '/sysRoleMenu',
  AssociationRole = '/sysRole/batch/conn',
  GetRoleListById = '/sysRole/role/', // /sysRole/role/{userId}
}

/**
 * @description: Get role based on token
 */
export function getRoleList() {
  return defHttp.get<SysRoleListRes>({ url: Api.GetSysRoleList });
}

/**
 * 获取ID角色权限列表
 */
export function getRoleAuthList(id : number) {
  return defHttp.get<SysRoleAuthList>({ url: Api.GetSysRoleAuth + id });
}


/**
 * @description: Increase role based on RoleParams
 */
export const increaseRole = (params) => {
  return defHttp.post({ url: Api.ModifyRole, params })
}

/**
 * @description: Modify role based on RoleParams
 */
export const modifyRole = (params) => {
  return defHttp.post({ url: Api.ModifyRole, params })
}

/**
 * @description: Delete role based on roleId
 */
export function deleteRole(id : number) {
  return defHttp.get({ url: Api.DeleteRole + id })
}

/**
 * @description: Grant user menu permission based on <GrantParams>
 */
export function grantPermission(params) {
  return defHttp.post({ url: Api.GrantPermission, params })
}


/**
 * @description: AssociationRole user and role based on <AssociationRoleParams>
 */
export function AssociationRole(params) {
  return defHttp.post({ url: Api.AssociationRole, params })
}

/**
 * @description: Get roleTree based on userId
 */
export function getRoleListByUserId(userId : number) {
  return defHttp.get<SysRoleListRes>({ url: Api.GetRoleListById + userId });
}
