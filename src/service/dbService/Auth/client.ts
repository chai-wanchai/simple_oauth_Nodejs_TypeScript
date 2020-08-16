import { User } from "../../../model/Auth/User";
import { getConnection, QueryRunner, Connection, Repository, UpdateResult, Like, Raw } from 'typeorm';
import { mapDataPropertiesToDBColumns } from "../../../utils/dbUtils";
import { Client } from "../../../model/Auth/Client";
class ClientDbService {
	connection!: Connection;
	clientModel!: Repository<Client>;
	getDb() {
		this.connection = getConnection();
		this.clientModel = this.connection.getRepository(Client)
		return this.connection;
	}
	async getAllClient() {
		this.getDb();
		const result = await this.clientModel.find()
		return result;
	}
	async createClient(entity: Client) {
		this.getDb();
		const result = await this.clientModel.save(entity)
		return result;
	}
	async findById(id: string) {
		this.getDb();
		const result = await this.clientModel.findOne({ client_id: id })
		return result;
	}
	async getClientInfo(client_id: number, clientSecret: string) {
		this.getDb()
		const result = await this.clientModel.findOne({ where: { client_id: client_id, clientSecret: clientSecret } })
		return result
	}

	async updateClient(client_id: string, entity: Client): Promise<UpdateResult> {
		this.getDb();
		const columns = Object.keys(this.clientModel.metadata.propertiesMap);
		let updateData = mapDataPropertiesToDBColumns(columns, entity);
		const result = await this.clientModel.update({ client_id: client_id }, updateData);
		return result;
	}
	async deleteClient(client_id: string) {
		this.getDb();
		const result = await this.clientModel.softDelete({ client_id })
		return result
	}
}
export const clientService = new ClientDbService();
export default clientService;