
import { Sequelize, Model, DataTypes, ModelAttributes, UUIDV4 } from 'sequelize';
import { Client } from './Client';
import { SystemConfig } from './SystemConfig';

export interface IClientConfig {
  clientId: number;
  configCode: string;
  configValue: string;
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
    references: {
      model: Client,
      key: 'clientId'
    }
  },
  configCode: {
    type: DataTypes.STRING,
    references: {
      model: SystemConfig,
      key: 'configCode'
    }
  },
  configValue: {
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

export class ClientConfig extends Model<IClientConfig> {
  public attributesValue!: IClientConfig
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

export const clientConfigFactory = (sequelize: Sequelize) => {
  ClientConfig.init(Attributes, {
    sequelize,
    tableName: 'ClientConfig',
  })
  return ClientConfig
}
