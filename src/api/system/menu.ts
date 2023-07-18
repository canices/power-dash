import {
  MenuParams,
  MenuListGetResultModel,
  MenuIncreasePostRequestModel
} from './model/menuModel';
import { defHttp, formDataHttp } from '/@/utils/http/axios';
// import { toTreeData } from '@/utils/common'

enum Api {
  GetMenuList = '/user/menu',
  GetMenu = '/sysMenu/', // /sysMenu/{menuId}
  GetAllMenuList = '/sysMenu/get',
  IncreaseMenu = '/sysMenu',
  ModifyMenu = '/sysMenu',
  DeleteMenu = '/sysMenu/', // /sysMenu/{id}
  GetMenuByUserId = '/sysMenu/all/', // /sysMenu/all/{userId}
}

// export const getMenuList = (params?: MenuParams) => 
//   defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });


export function getMenuList(params ?: MenuParams) {
  let result = {}
  result = defHttp.get<MenuListGetResultModel>({ url: Api.getAllMenuList, params });
  result.then(res => {
    console.log(1222)
    console.log(res)
  })
  return defHttp.get<MenuListGetResultModel>({ url: Api.getAllMenuList, params });
}

// by xz
// 不带分页查询所有菜单
// export const getAllMenuList = () => {
//   // let result = {}
//   // result = await defHttp.get<MenuListGetResultModel>({ url: Api.getAllMenuList }, { errorMessageMode: 'none' })
//   // console.log(result)
//   // console.log(typeof result)
//   // result = toTreeData(result)
//   // console.log(result)
//   // console.log(typeof result)
//   // return result
//   return defHttp.get<MenuListGetResultModel>({ url: Api.getAllMenuList }, { errorMessageMode: 'none' })
// }

export function getAllMenuList() {
  return defHttp.get({ url: Api.GetAllMenuList });
  
}


/**
 * @description: Get user menu based on <id>
 */
export const getMenu = (id: number) => {
  return defHttp.get({ url: Api.GetMenu + id })
}

/**
 * @description: Increase menu based on <MenuParams>
 */
export const increaseMenu = (params: MenuIncreasePostRequestModel) => {
  return defHttp.post({ url: Api.IncreaseMenu, params });
}

/**
 * @description: Modify menu based on <MenuParams>
 */
export const modifyMenu = (params: MenuIncreasePostRequestModel) => {
  return defHttp.post({ url: Api.ModifyMenu, params });
}

export function deleteMenu(id: number) {
  return defHttp.delete({ url: Api.DeleteMenu + id })
}

/**
 * @description: Get menu based on <userId>
 */
export function getMenuById(userId: number) {
  return defHttp.get({ url: Api.GetMenuByUserId + userId })
}