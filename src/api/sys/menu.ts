import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/user/menu',
  GetMenu = '/sysMenu/', // /sysMenu/{id}
  IncreaseMenu = '/sysMenu',
  ModifyMenu = '/sysMenu'
}

/**
 * @description: Get user menu based on id
 */
export const getMenu = (id: number) => {
  return defHttp.get({ url: Api.GetMenu + id })
}

/**
 * @description: Get all user menu
 */
export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

/**
 * @description: Increase menu based on MenuParams
 */
export const increaseMenu = (params: MenuIncreaseRequestModel) => {
  return defHttp.post({ url: Api.IncreaseMenu, params });
}

/**
 * @description: Modify menu based on MenuParams
 */
export const modifyMenu = (params) => {
  return defHttp.post({ url: Api.ModifyMenu, params });
}
