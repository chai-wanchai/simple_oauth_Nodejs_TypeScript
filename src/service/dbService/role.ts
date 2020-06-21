import { Model, DataTypes, BuildOptions, ModelAttributes } from 'sequelize';
import Database from '../../common/database'
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

export type RoleModelType = typeof Model & { new(values?: object, options?: BuildOptions); }
const RoleModel = <RoleModelType>Database.connection.define('Role', Attributes);
export default RoleModel