import { Users } from "../../../model/Auth/User";
import { getConnection, QueryRunner, Connection, Repository, UpdateResult, Like, Raw } from 'typeorm';
import { mapDataPropertiesToDBColumns } from "../../../utils/dbUtils";
class UserDbService {
	connection!: Connection;
	userModel!: Repository<Users>;
	getDb() {
		this.connection = getConnection();
		this.userModel = this.connection.getRepository(Users)
		return this.connection;
	}
	async createUser(entity: Users): Promise<Users> {
		this.getDb();
		const result = await this.userModel.save(entity)
		return result;
	}
	async findUserByUid(uid: string) {
		this.getDb();
		const result = await this.userModel.findOne({ uid: uid })
		return result;
	}
	async findUserByEmail(email: string) {
		this.getDb();
		const result = await this.userModel.findOne({ email: email })
		return result;
	}
	async updateUser(entity: Users, username: string): Promise<UpdateResult> {
		this.getDb();
		const columns = Object.keys(this.userModel.metadata.propertiesMap);
		let updateData = mapDataPropertiesToDBColumns(columns, entity);
		const result = await this.userModel.update({ username: username }, updateData);
		return result;
	}
}
export const userService = new UserDbService();
export default userService;