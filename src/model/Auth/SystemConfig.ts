
import { Sequelize, Model, DataTypes, ModelAttributes, UUIDV4 } from 'sequelize';

export interface ISystemConfig {
  configCode: string;
  configName: string;
  configDefaultValue: string;
  description: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Attributes: ModelAttributes = {
  configCode: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true
  },
  configName: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  configDefaultValue: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}

export class SystemConfig extends Model<ISystemConfig> {
  public attributesValue!: ISystemConfig
  public configCode!: string;
  public configName!: string;
  public configDefaultValue!: string;
  public description!: string;
  public isActive!: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export const systemConfigFactory = (sequelize: Sequelize) => {
  SystemConfig.init(Attributes, {
    sequelize,
    tableName: 'SystemConfig',
  })
  return SystemConfig
}
