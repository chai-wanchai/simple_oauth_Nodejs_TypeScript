import dbService from '../service/dbService'
import { IRole, IUserRolePermission } from '../types/role';
import { ErrorHandle, IError, CommonError } from '../common/errorHandle';
export class RoleManager {
  public async createRole(roleCode: string, roleName: string, description?: string, createdBy?: number, clientId?: number) {
    const roleData: IRole = {
      roleCode: roleCode,
      roleName: roleName,
      clientId: clientId,
      description: description,
      createdBy: createdBy,
      updatedBy: createdBy
    }
    const result = await dbService.dbModelAuth.role.upsert(roleData, { returning: true })
    return result;
  }
  public async createUserRole(userId: number, roleId: number) {
    const userRole: IUserRolePermission = {
      roleId: roleId,
      userId: userId
    }
    const result = await dbService.dbModelAuth.role.upsert(userRole, { returning: true })
    return result;
  }
  public async checkRole(roleCode: string) {
    const result = await dbService.dbModelAuth.role.findOne({ where: { roleCode: roleCode } })
    return result;
  }
}
export default new RoleManager()