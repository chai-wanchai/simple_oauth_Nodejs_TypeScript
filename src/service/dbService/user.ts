import { Model, DataTypes, BuildOptions, ModelAttributes, UUIDV4 } from 'sequelize';
import Database from '../../common/database'
import token from './token'
import role from './role'
export const Attributes: ModelAttributes = {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gender: {
    type: DataTypes.CHAR(1)
  },
  dob: {
    type: DataTypes.DATEONLY
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  pictureUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: true
  },
  uid: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: true,
    defaultValue: UUIDV4
  },
  idp: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'native'
  }
}

export type UserModelType = typeof Model & { new(values?: object, options?: BuildOptions); }
const UserModel = <UserModelType>Database.connection.define('Users', Attributes);
UserModel.sync()
export default UserModel