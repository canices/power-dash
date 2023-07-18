import { BasicFetchResult } from '/@/api/model/baseModel';

export interface DeptListItem {
  id: string;
  msg: string,
  result : any,
  list: any
  // orderNo: string;
  // createTime: string;
  // remark: string;
  // status: number;
}

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;
