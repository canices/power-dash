import { defHttp, formDataHttp } from '/@/utils/http/axios';
// import { DeptListGetResultModel } from './model/deptModel'

enum Api {
  GetDeptList = '/dept/page',
  IncreaseDept = '/dept',
  ModifyDept = '/dept/updateDept',
  GetMenu = '/sysMenu/get', // /sysMenu/{id}
  DeleteDept = '/dept/' // /dept/{id}
}

/**
 * @description: Get deptList based on <deptParams>
 */
export function getDeptList(params) {
  // return defHttp.post({ url: Api.GetDeptList, params, headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED } });
  return formDataHttp.post({ url: Api.GetDeptList, params });
}
// export const getDeptList = (params) => 
  // defHttp.post<DeptListGetResultModel>({ url: Api.GetDeptList, params });
  // defHttp.post({ url: Api.GetDeptList, params });
  
  // export const getMenu = (id: number) => {
  //   return defHttp.get({ url: Api.GetMenu + id })
  // }
  export const getMenu = () => defHttp.get({ url: Api.GetMenu })

// export const getDeptList = (params?: DeptListItem) =>
//   defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

// export const demoListApi = (params: DemoParams) =>
//   defHttp.get<DemoListGetResultModel>({
//     url: Api.DEMO_LIST,
//     params,
//     headers: {
//       // @ts-ignore
//       ignoreCancelToken: true,
//     },
//   });

/**
 * @description: Increase dept based on <DeptParams>
 */
export const increaseDept = (params ?: any) => {
  return defHttp.post({ url: Api.IncreaseDept, params })
}

/**
 * @description: Modify dept based on <DeptParams>
 */
export const modifyDept = (params) => {
  return defHttp.post({ url: Api.ModifyDept, params})
}

/**
 * @description: Delete dept based on <id>
 */
export function deleteDept(id: number) {
  return defHttp.delete({ url: Api.DeleteDept + id })
}
