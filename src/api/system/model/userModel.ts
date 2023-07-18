import { BasicFetchResult } from '/@/api/model/baseModel';

/**
 * DeptUserDeptId，根据部门ID获取部门用户获取实体DTO
 */
export interface GetUserByDeptParams {
    /**
     * 部门ID
     */
    deptId: string ='0';
}

// export class MyClass {
  
// }

// function initGetUserByDept(options ?: Partial<GetUserByDeptParams>) : GetUserByDeptParams {
//   const defaults = {
//     deptId: 0
//   }
  
//   return {
//     ...defaults,
//     ...options
//   }
// }


// export type GetUserByDeptResultModel = BasicFetchResult<GetUserByDeptParams>;
