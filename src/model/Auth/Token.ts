
import { Sequelize, Model, DataTypes, ModelAttributes, UUIDV4 } from 'sequelize';
import { IUsers } from './User';

export interface IToken {
  tokenId: string;
  refreshToken: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Attributes: ModelAttributes = {
  tokenId: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: UUIDV4
  },
  refreshToken: {
    type: DataTypes.UUID,
    unique: true,
    defaultValue: UUIDV4
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}

export class Token extends Model<IToken> {
  public attributesValue!: IToken
  public tokenId!: string;
  public refreshToken!: string;
  public isActive!: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
  public User!: IUsers
}

export const tokenFactory = (sequelize: Sequelize) => {
  Token.init(Attributes, {
    sequelize,
    tableName: 'Token',
  })
  return Token
}
