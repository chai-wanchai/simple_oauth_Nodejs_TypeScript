import { Sequelize, Model, DataTypes, ModelAttributes, UUIDV4 } from 'sequelize';

export interface IUsers {
  userId: number;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phoneNumber: string;
  username: string;
  email: string;
  pictureUrl: string;
  password: string;
  isActive: boolean;
  isEmailVerify: boolean;
  uid: string;
  idp: string;
  createdAt?: Date;
  updatedAt?: Date;
}
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
    type: DataTypes.CHAR(1),
    comment: 'Gender use [M=Male,F=Female]'
  },
  dob: {
    type: DataTypes.DATEONLY,
    comment: 'Date Of Brith'
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
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
  isEmailVerify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
    defaultValue: 'native',
    comment: "Identity Provider, If [native=register by our system], [line=line login], [google=goole login]"
  }
}

export class Users extends Model<IUsers> {
  public attributesValue!: IUsers
  public userId!: number;
  public firstName!: string;
  public lastName!: string;
  public gender!: string;
  public dob!: string;
  public phoneNumber!: string;
  public username!: string;
  public email!: string;
  public pictureUrl!: string;
  public password!: string;
  public isActive!: boolean;
  public isEmailVerify!: boolean;
  public uid!: string;
  public idp!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export const userFactory = (sequelize: Sequelize) => {
  Users.init(Attributes, {
    sequelize,
    tableName: 'Users',
  })
  return Users
}
