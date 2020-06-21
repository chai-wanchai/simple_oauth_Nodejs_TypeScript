import { Model, DataTypes, BuildOptions, ModelAttributes, UUIDV4, UUIDV1 } from 'sequelize';
import Database from '../../common/database'
export const Attributes: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clientId: {
    type: DataTypes.STRING,
    defaultValue: UUIDV1
  },
  clientSecret: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdBy: {
    type: DataTypes.INTEGER
  },
  updatedBy: {
    type: DataTypes.INTEGER
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

}

export type ClientModelType = typeof Model & { new(values?: object, options?: BuildOptions); }
const ClientModel = <ClientModelType>Database.connection.define('Client', Attributes);
export default ClientModel