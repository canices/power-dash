import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

// export type MenuParams = {
//   menuName?: string;
//   status?: string;
// };

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

/**
 * Request
 *
 * SysMenu，权限菜单实体
 */
export interface MenuParams {
    /**
     * 是否显示（0显示,1不显示）
     */
    display: number;
    /**
     * 菜单id
     */
    id?: number;
    /**
     * 父级菜单id
     */
    parentId?: number;
    /**
     * 菜单状态(0启用、1禁用.2接口异常)
     */
    status?: number;
    /**
     * 菜单编码
     */
    sysMenuCode?: string;
    /**
     * 前端组件路径
     */
    sysMenuComponent?: string;
    /**
     * 菜单描述
     */
    sysMenuDesc?: string;
    /**
     * 菜单图标
     */
    sysMenuIcon?: string;
    /**
     * 菜单名称
     */
    sysMenuName: string;
    /**
     * 菜单排序
     */
    sysMenuOrder?: number;
    /**
     * 菜单类型（0页面、1文件夹，2按钮,3外部链接(本窗口打开)，4外部链接，新窗口打开）
     */
    sysMenuType?: number;
    /**
     * 菜单地址
     */
    sysMenuUrl?: string;
    /**
     * 前端请求方法
     */
    sysMenuUrlAction?: SysMenuUrlAction;
}

/**
 * @description: Request list return value
 */

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type MenuIncreasePostRequestModel = MenuParams
