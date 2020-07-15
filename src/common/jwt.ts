import * as jwt from 'jsonwebtoken'
import config from '../../config'
import { IToken } from '../@types/token'
export class JWT {
  encodeToken(payload: object, Option?: jwt.SignOptions): string {
    const payloads = {
      ...payload,
      iat: Math.floor(Date.now() / 1000) - 30
    }
    const option: jwt.SignOptions = {
      expiresIn: '1d',
      ...Option
    }
    const token = jwt.sign(payloads, config.jwt.secret, option)
    return token
  }
  verifyToken(token: string): IToken {
    const decode = jwt.verify(token, config.jwt.secret)
    return decode as IToken
  }
  decodeToken(token: string): any {
    const decode = jwt.decode(token)
    return decode
  }
}
export default new JWT()