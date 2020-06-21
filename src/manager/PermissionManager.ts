import dbService from '../service/dbService'
import { IRolePermission, IPermission } from '../types/permission';
import { ErrorHandle, IError, CommonError } from '../common/errorHandle';
export class PermissiobManager {

  public async createPermission(permissionCode: string, permissionName: string, description?: string, createdBy?: number, clientId?: number) {
    try {
      const permissionData: IPermission = {
        permissionCode: permissionCode,
        permissionName: permissionName,
        clientId: clientId,
        description: description,
        createdBy: createdBy,
        updatedBy: createdBy
      }
      const result = await dbService.dbModelAuth.permission.upsert(permissionData, { returning: true })
      return result;
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err;
    }
  }
  public async createRolePermission(roleCode: string, permissionCode: string) {
    const roleData = await Promise.all([
      dbService.dbModelAuth.role.findOne({ where: { roleCode: roleCode }, attributes: ['roleId', 'roleCode', 'roleName'] }),
      dbService.dbModelAuth.permission.findOne({ where: { permissionCode: permissionCode }, attributes: ['permissionId', 'permissionCode', 'permissionName'] })
    ])
    if (roleData[0] && roleData[1]) {
      if (roleData[0].roleId && roleData[1].permissionId) {
        const data: IRolePermission = {
          roleId: roleData[0].roleId,
          permissionId: roleData[1].permissionId
        }
        const result = await dbService.dbModelAuth.rolePermission.upsert(data, { returning: true })
        return result;
      }

    } else {
      const error = new CommonError()
      error.setCustomError(400, 'Invalid roleCode/permissionCode', 'INPUT_INVALID', roleData)
      throw error;
    }
  }
  public async checkPermissionByList(PermissionCode: Array<string>) {
    try {
      const result = await dbService.dbModelAuth.permission.findAll({ where: { permissionCode: PermissionCode } });
      return result;
    } catch (error) {
      const err = new ErrorHandle(error)
      throw err;
    }
  }
}
export default new PermissiobManager()