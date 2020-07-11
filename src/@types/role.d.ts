export interface IRole {
  roleId?: number,
  roleCode?: string,
  roleName?: string,
  description?: string;
  clientId?: number,
  createdBy?: number,
  updatedBy?: number
}
export interface IUserRolePermission {
  roleId: number,
  userId: number
}