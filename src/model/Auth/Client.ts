
import { Sequelize, Model, DataTypes, ModelAttributes, UUIDV4 } from 'sequelize';

export interface IClient {
  clientId: number;
  clientSecret: string;
  clientName: string;
  description: string;
  createdBy: number;
  updatedBy: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Attributes: ModelAttributes = {
  clientId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clientSecret: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    unique: true
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

export class Client extends Model<IClient> {
  public attributesValue!: IClient
  public clientId!: number;
  public clientSecret!: string;
  public clientName!: string;
  public description!: string;
  public createdBy!: number;
  public updatedBy!: number;
  public isActive!: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export const clientFactory = (sequelize: Sequelize) => {
  Client.init(Attributes, {
    sequelize,
    tableName: 'Client',
  })
  return Client
}
