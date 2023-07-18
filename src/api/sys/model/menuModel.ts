import type { RouteMeta } from 'vue-router';

export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
  // authCode: string;
  // display: number;
  // id: number;
  // parentId: number;
  // path: string;
  // status: number;
  // sysMenuCode: string;
  // sysMenuComponet: string;
  // sysMenuDesc: string;
  // sysMenuIcon: string;
  // sysMenuName: string;
  // sysMenuOrder: number;
  // sysMenuType: number;
  // sysMenuUrl: string;
  // sysMenuAction: string;
  // sysRoleCode: string;
}

/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = RouteItem[];
