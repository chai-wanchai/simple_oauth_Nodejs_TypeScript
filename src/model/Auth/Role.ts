
import { Sequelize, Model, DataTypes, ModelAttributes, UUIDV4 } from 'sequelize';

export interface IRole {
  roleId: number;
  roleCode: string;
  roleName: string;
  description: string;
  createdBy: number;
  updatedBy: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Attributes: ModelAttributes = {
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  roleName: {
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

export class Role extends Model<IRole> {
  public attributesValue!: IRole
  public roleId!: number;
  public roleCode!: string;
  public roleName!: string;
  public description!: string;
  public createdBy!: number;
  public updatedBy!: number;
  public isActive!: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export const roleFactory = (sequelize: Sequelize) => {
  Role.init(Attributes, {
    sequelize,
    tableName: 'Role',
  })
  return Role
}
