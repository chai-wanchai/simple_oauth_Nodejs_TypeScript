import { User } from "../../../model/Auth/User";
import { getConnection, QueryRunner, Connection, Repository, UpdateResult, Like, Raw } from 'typeorm';
import { mapDataPropertiesToDBColumns } from "../../../utils/dbUtils";
import { Role } from "../../../model/Auth/Role";
import { IPage } from "../../../@types/search";
import { Permission } from "../../../model/Auth/Permission";
import { RolePermission } from "../../../model/Auth/RolePermission";
class RoleDbService {
  connection: Connection;
  roleModel: Repository<Role>;
  permissionModel: Repository<Permission>;
  rolePermissionModel: Repository<RolePermission>;
  getDb() {
    this.connection = getConnection();
    this.roleModel = this.connection.getRepository(Role);
    this.permissionModel = this.connection.getRepository(Permission);
    this.rolePermissionModel = this.connection.getRepository(RolePermission);
    return this.connection;
  }
  async searchRole(paging: IPage, criteria: any) {
    this.getDb();
    const [result, total] = await this.roleModel.createQueryBuilder('role')
      .skip(paging.showItemPerPage * (paging.activePage - 1))
      .take(paging.showItemPerPage)
      .getManyAndCount();
    return {
      result, total
    };
  }
  async getRoleList() {
    this.getDb();
    const result = await this.roleModel.find();
    return result;
  }
  async createRole(data: Role) {
    this.getDb();
    const result = await this.roleModel.insert(data);
    return result;
  }
  async updateRoleById(role_id: number, data: Role) {
    this.getDb();
    const columns = Object.keys(this.roleModel.metadata.propertiesMap);
    let updateData = mapDataPropertiesToDBColumns(columns, data);
    const result = await this.roleModel.update(role_id, updateData);
    return result;
  }
  async deleteRoleById(role_id: number) {
    this.getDb();
    const result = await this.roleModel.softDelete(role_id);
    return result;
  }
  async searchPermission(paging: IPage, criteria: any) {
    this.getDb();
    const [result, total] = await this.permissionModel.createQueryBuilder('permission')
      .skip(paging.showItemPerPage * (paging.activePage - 1))
      .take(paging.showItemPerPage)
      .getManyAndCount();
    return {
      result, total
    };
  }
  async getPermissionList() {
    this.getDb();
    const result = await this.permissionModel.find();
    return result;
  }
  async createPermission(data: Permission) {
    this.getDb();
    const result = await this.permissionModel.insert(data);
    return result;
  }
  async updatePermissionByCode(permissionCode: string, data: Permission) {
    this.getDb();
    const columns = Object.keys(this.permissionModel.metadata.propertiesMap);
    let updateData = mapDataPropertiesToDBColumns(columns, data);
    const result = await this.permissionModel.update(permissionCode, updateData);
    return result;
  }
  async deletePermissionByCode(permissionCode: string) {
    this.getDb();
    const result = await this.permissionModel.softDelete(permissionCode);
    return result;
  }
  async searchRolePermission(paging: IPage, criteria: any) {
    this.getDb();
    const [result, total] = await this.roleModel.createQueryBuilder('role')
      .skip(paging.showItemPerPage * (paging.activePage - 1))
      .take(paging.showItemPerPage)
      .leftJoinAndSelect('role.role_permission', 'role_permission')
      .leftJoinAndSelect('role_permission.permission', 'permission')
      .getManyAndCount();
    return {
      result, total
    };
  }
  async getRolePermissionByRoleId(roleId: number) {
    this.getDb();
    const result = await this.rolePermissionModel.find({ where: { role: { role_id: roleId } }, relations: ['permission'] });
    return result;
  }
  async getRolePermissionList() {
    this.getDb();
    const result = await this.rolePermissionModel.find({ relations: ['role', 'permission'] });
    return result;
  }
  async createRolePermission(data: RolePermission) {
    this.getDb();
    const result = await this.rolePermissionModel
      .createQueryBuilder()
      .insert()
      .values(data)
      .orUpdate({ conflict_target: ['role_id', 'permission_code'], overwrite: ['updated_by', 'is_active', 'updated_date'] })
      .execute();
    return result;
  }
  async updateRolePermissionById(id: any, data: RolePermission) {
    this.getDb();
    const columns = Object.keys(this.rolePermissionModel.metadata.propertiesMap);
    let updateData = mapDataPropertiesToDBColumns(columns, data);
    const result = await this.rolePermissionModel.update({ rp_id: id }, updateData);
    return result;
  }
  async deleteRolePermissionById(id: any) {
    this.getDb();
    const result = await this.rolePermissionModel.softDelete({ rp_id: id });
    return result;
  }
}
export const roleService = new RoleDbService();
export default roleService;