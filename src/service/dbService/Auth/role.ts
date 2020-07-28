import { User } from "../../../model/Auth/User";
import { getConnection, QueryRunner, Connection, Repository, UpdateResult, Like, Raw } from 'typeorm';
import { mapDataPropertiesToDBColumns } from "../../../utils/dbUtils";
import { Role } from "../../../model/Auth/Role";
class RoleDbService {
	connection!: Connection;
	clientModel!: Repository<Role>;
	getDb() {
		this.connection = getConnection();
		this.clientModel = this.connection.getRepository(Role)
		return this.connection;
	}
	async createRole(entity: Role) {
		this.getDb();
		const result = await this.clientModel.save(entity)
		return result;
	}
	async findRoleById(id: number) {
		this.getDb();
		const result = await this.clientModel.findOne({ where: { role_id: id } })
		return result;
	}
	async getRoleInfoByRoleId(id: number) {
		this.getDb()
		const result = await this.clientModel.findOne({ where: { role_id: id } })
		return result
	}

	async updateRole(entity: Role, id: number): Promise<UpdateResult> {
		this.getDb();
		const columns = Object.keys(this.clientModel.metadata.propertiesMap);
		let updateData = mapDataPropertiesToDBColumns(columns, entity);
		const result = await this.clientModel.update({ role_id: id }, updateData);
		return result;
	}
}
export const roleService = new RoleDbService();
export default roleService;