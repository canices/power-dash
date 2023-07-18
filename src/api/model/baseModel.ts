export interface BasicPageParams {
  page: number;
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}
