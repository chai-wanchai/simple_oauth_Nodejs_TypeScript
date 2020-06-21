import { Model, DataTypes, BuildOptions, ModelAttributes, UUIDV4 } from 'sequelize';
import Database from '../../common/database'
export const Attributes: ModelAttributes = {
  tokenId: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: UUIDV4
  },
  refreshToken:{
    type: DataTypes.UUID,
    unique: true,
    defaultValue: UUIDV4
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}

export type TokenModelType = typeof Model & { new(values?: object, options?: BuildOptions); }
const TokenModel = <TokenModelType>Database.connection.define('Token', Attributes);
export default TokenModel