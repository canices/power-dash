/**
 * Request
 *
 * SysRole，系统角色对象
 */
export interface SysRole {
  /**
   * 角色id
   */
  id?: number;
  /**
   * 父级角色id
   */
  parentId?: number;
  /**
   * 角色状态(0:启用,1:禁用)
   */
  status?: number;
  /**
   * 角色编码（全局唯一）
   */
  sysRoleCode: string;
  /**
   * 角色描述
   */
  sysRoleDesc?: string;
  /**
   * 角色名称（全局唯一）
   */
  sysRoleName: string;
}

export interface SysRoleListRes {
  /**
   * 接口运行结果状态码
   */
  code?: number;
  /**
   * 程序运行结果提示
   */
  msg?: string;
  /**
   * 程序最终返回数据，如果没有则为空
   */
  result?: SysRole[];
}

export interface SysRoleMenuDto {
  /**
   * 菜单id
   */
  id?: number;
  /**
   * 菜单id（主键）
   */
  menuId: number;
  /**
   * 父级菜单id
   */
  parentId?: number;
  /**
   * 角色id（主键）
   */
  roleId: number;
  /**
   * 角色权限类型（0可访问,1可授权）
   */
  roleMenuType: number;
  /**
   * 菜单icon
   */
  sysMenuIcon?: string;
  /**
   * 菜单名称
   */
  sysMenuName?: string;
}
export interface SysRoleAuthList {
  parent: SysRoleMenuDto[];
  child: SysRoleMenuDto[];
}
