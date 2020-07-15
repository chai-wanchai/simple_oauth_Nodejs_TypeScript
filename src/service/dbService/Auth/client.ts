import { Users } from "../../../model/Auth/User";
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
	async findById(id: number) {
		this.getDb();
		const result = await this.clientModel.findOne({ clientId: id })
		return result;
	}
	async getClientInfo(clientId: number, clientSecret: string) {
		this.getDb()
		const result = await this.clientModel.findOne({ where: { clientId: clientId, clientSecret: clientSecret } })
		return result
	}

	async updateClient(clientId: number, entity: Client): Promise<UpdateResult> {
		this.getDb();
		const columns = Object.keys(this.clientModel.metadata.propertiesMap);
		let updateData = mapDataPropertiesToDBColumns(columns, entity);
		const result = await this.clientModel.update({ clientId: clientId }, updateData);
		return result;
	}
	async deleteClient(clientId: number) {
		this.getDb();
		const result = await this.clientModel.softDelete({ clientId })
		return result
	}
}
export const clientService = new ClientDbService();
export default clientService;