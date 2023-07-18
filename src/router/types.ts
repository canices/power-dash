import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { RoleEnum } from '/@/enums/roleEnum';
import { defineComponent } from 'vue';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

export interface Menu {
  name: string;

  icon?: string;

  path: string;

  // path contains param, auto assignment.
  paramPath?: string;

  disabled?: boolean;

  children?: Menu[];

  orderNo?: number;

  roles?: RoleEnum[];

  meta?: Partial<RouteMeta>;

  tag?: MenuTag;

  hideMenu?: boolean;
}

export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw;

// by xz
export interface BackRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  authCode: string;
  children?: BackRouteRecordRaw[];
  component?: Component | string;
  display: number;
  id: number;
  meta?: Partial<RouteMeta>;
  name: string;
  parentId: number;
  path: string;
  status: number;
  sysMenuCode: string;
  sysMenuComponent: string;
  sysMenuDesc: string;
  sysMenuIcon: string;
  sysMenuName: string;
  sysMenuOrder: number;
  sysMenuType: number;
  sysMenuUrl: string;
  sysMenuUrlAction: string;
  sysRoleCode: string;
}

export type BackRouteModule = BackRouteRecordRaw

export interface RouteItem extends Omit<RouteRecordRaw, 'meta'> {
  children: RouteItem[];
  icon: string;
  meta: object;
  name: string;
  path: string;
  redirect: string;
  title: string;
}
