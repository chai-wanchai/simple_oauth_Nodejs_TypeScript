
import { Sequelize, Model, DataTypes, ModelAttributes, UUIDV4 } from 'sequelize';

export interface IPermission {
  permissionId: number;
  permissionCode: string;
  permissionName: string;
  description: string;
  createdBy: number;
  updatedBy: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Attributes: ModelAttributes = {
  permissionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  permissionCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  permissionName: {
    type: DataTypes.STRING
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
export class Permission extends Model<IPermission> {
  public attributesValue!: IPermission
  public permissionId!: number;
  public permissionCode!: string;
  public permissionName!: string;
  public description!: string;
  public createdBy!: number;
  public updatedBy!: number;
  public isActive!: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export const permissionFactory = (sequelize: Sequelize) => {
  Permission.init(Attributes, {
    sequelize,
    tableName: 'Permission',
  })
  return Permission
}
