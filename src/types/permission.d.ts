export interface IPermission {
  permissionId?: number,
  permissionCode?: string,
  permissionName?: string,
  description?: string;
  clientId?: number,
  createdBy?: number,
  updatedBy?: number
}
export interface IRolePermission {
  roleId?: number,
  roleCode?: string,
  permissionId?: number
  permissionCode?: string
}