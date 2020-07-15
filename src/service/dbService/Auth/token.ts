import { Users } from "../../../model/Auth/User";
import { getConnection, QueryRunner, Connection, Repository, UpdateResult, Like, Raw } from 'typeorm';
import { mapDataPropertiesToDBColumns } from "../../../utils/dbUtils";
import { Token } from "../../../model/Auth/Token";
import { or } from "sequelize";
class TokenDbService {
	connection!: Connection;
	tokenModel!: Repository<Token>;
	getDb() {
		this.connection = getConnection();
		this.tokenModel = this.connection.getRepository(Token)
		return this.connection;
	}
	async createUserToken(entity: Token) {
		this.getDb();
		const result = await this.tokenModel.save(entity)
		return result;
	}
	async findActiveUserToken(tokenId: string) {
		this.getDb();
		const result = await this.tokenModel.findOne({ where: { isActive: true, tokenId: tokenId } })
		return result;
	}
	async findActiveRefreshToken(refreshTokenId: string) {
		this.getDb();
		const result = await this.tokenModel.findOne({ where: { isActive: true, refreshToken: refreshTokenId } })
		return result;
	}
	async updateUserTokenByTokenId(tokenId: string, entity: Token): Promise<UpdateResult> {
		this.getDb();
		const columns = Object.keys(this.tokenModel.metadata.propertiesMap);
		let updateData = mapDataPropertiesToDBColumns(columns, entity);
		const result = await this.tokenModel.update({ tokenId: tokenId }, updateData);
		return result;
	}
}
export const tokenService = new TokenDbService();
export default tokenService;