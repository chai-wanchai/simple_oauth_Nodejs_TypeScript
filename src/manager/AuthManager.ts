import JWT from '../common/jwt'
import * as bcrypt from 'bcryptjs'
import * as _ from 'lodash'
import { CommonError, ErrorHandle } from '../common/errorHandle'
import dbService from '../service/dbService'
import { Op } from 'sequelize'
import { IClient } from '../types/client';
import { IUsers } from '../model/Auth/User'
export class AuthManager {
  decodePassword(password: string, hashPassword: string) {
    const result = bcrypt.compareSync(password, hashPassword)
    if (result) {
      return result
    } else {
      const error = new CommonError()
      error.setErrorByCode('PASSWORD_INVALID')
      throw error
    }
  }
  encodePassword(password: string) {
    const hashPassword = bcrypt.hashSync(password, 10)
    return hashPassword
  }
  encryptData(userPayload: any) {
    const { password } = userPayload
    if (password) {
      userPayload.password = this.encodePassword(password)
    }
    return userPayload
  }
  async getTokenResult(usersData: IUsers, client: IClient) {
    const tokenResult = await dbService.dbModelAuth.userToken.create({ userId: usersData.userId, clientId: client.clientId })    
    const payloadAccesstoken = {
      ...this.selectPayloadAccesstoken(usersData),
      jti: tokenResult.tokenId,
      sub: usersData.userId,
      typ: 'access_token',
      client_id: client.clientId
    }
    const payloadRefreshtoken = {
      jti: tokenResult.refreshToken,
      sub: usersData.userId,
      typ: 'refresh_token',
      client_id: client.clientId
    }
    const accessToken = JWT.encodeToken(payloadAccesstoken)
    const refreshToken = JWT.encodeToken(payloadRefreshtoken, { expiresIn: "7d" })
    const result = {
      access_token: accessToken,
      token_type: 'Bearer',
      refresh_token: refreshToken
    }
    return result
  }
  async checkRefreshToken(refreshToken: string) {
    try {
      const token = JWT.verifyToken(refreshToken) as any
      if (token.typ === 'refresh_token') {
        const tokenResult = await dbService.dbModelAuth.userToken.findOne({
          where: {
            refreshToken: token.jti,
            userId: token.sub,
            isActive: true
          },
          include: [
            { model: dbService.dbModelAuth.users }
          ]
        })
        if (tokenResult) {
          this.revokeToken(token.jti)
          return this.getTokenResult(tokenResult.User, token.client_id)
        } else {
          const error = new CommonError()
          error.setErrorByCode('TOKEN_REVOKE')
          throw error
        }
      } else {
        throw Error('Refresh Token Not Valid')
      }
    } catch (error) {
      const err = new ErrorHandle(error)
      if (err.getError().errorCode === 'TokenExpiredError') {
        const token = JWT.decodeToken(refreshToken) as any
        this.revokeToken(token.jti)
      }
      throw err
    }

  }
  async revokeToken(tokenId: string) {
    const tokenResult = await dbService.dbModelAuth.userToken.update({ isActive: false }, {
      where: { [Op.or]: [{ tokenId: tokenId }, { refreshToken: tokenId }] }
    })
    return tokenResult
  }
  selectPayloadAccesstoken(userPayload: any) {
    const selectField: any = ['email', 'uid', 'displayName', 'userId']
    const payload = _.pick(userPayload, selectField)
    return payload
  }
}
export default new AuthManager()