export interface IPaging {
  activePage: number;
  showItemPerPage: number | 'ALL';
  totalPage: number;
  offset?: number | 'ALL' | string;
  limit?: string;
}
export interface IPage{
  activePage: number;
  showItemPerPage: number;
}