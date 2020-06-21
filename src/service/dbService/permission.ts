import { Model, DataTypes, BuildOptions, ModelAttributes } from 'sequelize';
import Database from '../../common/database'
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

export type PermissionModelType = typeof Model & { new(values?: object, options?: BuildOptions); }
const PermissionModel = <PermissionModelType>Database.connection.define('Permission', Attributes);
export default PermissionModel