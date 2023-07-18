import { cloneDeep } from 'lodash-es';

export function backendDataTransformToVben(oriRouteList: any) {
  const routeList = [];

  oriRouteList
    .filter((oriItem) => oriItem['sysMenuType'] !== 2)
    .forEach((oriItem) => {
      const item = {};
      const meta = {
        title: oriItem.sysMenuName,
        isLink: oriItem.sysMenuType === 3 || oriItem.sysMenuType === 4 ? item.sysMenuUrl : '',
        isHide: oriItem.display !== 0,
        isKeepAlive: true,
        isAffix: oriItem.sysMenuCode === 'home',
        isIframe: oriItem.sysMenuType === 3,
        roles: [oriItem.sysRoleCode],
        icon: oriItem.sysMenuIcon,
        hideMenu: oriItem.display,
        frameSrc: oriItem.sysMenuType === 3 ? oriItem.sysMenuComponent : '',
      };
      // item.children =
      item.component = oriItem.sysMenuComponent;
      item.meta = meta;
      item.name = oriItem.sysMenuName;
      item.path = oriItem.sysMenuUrl;
      item.id = oriItem.id;
      item.parentId = oriItem.parentId;
      // item.redirect = oriItem.sysMenuComponent

      routeList.push(item);
    });
  return routeList;
}

export function toTreeData(oriData) {
  const data = cloneDeep(oriData);
  const map = {};
  const result = [];

  // 将所有节点存储在映射表中
  data.forEach((node) => {
    node.children = [];
    map[node.id] = node;
  });

  // 构建树形结构
  data.forEach((node) => {
    if (node.parentId !== null) {
      const parent = map[node.parentId];
      if (parent) {
        parent.children.push(node);
      } else {
        result.push(node);
      }
    } else {
      result.push(node);
    }
  });
  return result;
}

export function detailsMenu(data: any[]): any[] {
  return data.map((item) => {
    if (item.children) {
      item.redirect = item.children[0].path;
      item.children = detailsMenu(item.children);
    }
    return item;
  });
}
