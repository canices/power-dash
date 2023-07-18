import { cloneDeep } from 'lodash-es';


export function toTreeData(oriData) {
  const data = cloneDeep(oriData);
  let map = {};
  let result = [];

  // 将所有节点存储在映射表中
  data.forEach(node => {
    node.children = []
    map[node.id] = node
  });

  // 构建树形结构
  data.forEach(node => {
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
  console.log('result is:')
  console.log(result)
  removeEmptyChildrenRecursive(result)
  return result;
}

function removeEmptyChildren(obj) {
  if (Array.isArray(obj.children)) {
    obj.children.forEach((child) => removeEmptyChildren(child));
    if (obj.children.length === 0) {
      delete obj.children;
    }
  }
}


function removeEmptyChildrenRecursive(data) {
  data.forEach((item) => {
    if (Array.isArray(item.children) && item.children.length === 0) {
      delete item.children;
    } else if (Array.isArray(item.children)) {
      removeEmptyChildren(item);
    }
  });
}

// ApiTreeSelect due to data transform
export function toApiTreeSelect(arr, type: String) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    switch (type) {
      case 'menu':
        item.label = item.sysMenuName;
        break;
      case 'role':
        item.label = item.sysRoleName;
        break;
      case 'dept':
        item.label = item.deptName;
        break;
      default:
        item.lable = '';
    }
    item.label = item.sysRoleName; // 设置当前项的label属性为sysRoleName属性
    item.value = item.id;
    if (item.children && item.children.length > 0) {
      toApiTreeSelect(item.children, type); // 递归处理children数组中的每一项
    }
  }
}

// Adjust treeSelect data, if all of the parent's node be choosen,just return parent's id 
export function filterParentNodes(data, ids) {
  const selectedIds = new Set(ids); // 转换为Set以提高查找效率

  const filteredIds = ids.filter(id => {
    const item = data.find(item => item.id === id);
    return !selectedIds.has(item.parentId); // 只保留未选择父节点的子节点
  });

  return filteredIds;
}
