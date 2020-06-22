import * as jwt from 'jsonwebtoken'
import config from '../../config'
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
  verifyToken(token: string): object | string {
    const decode = jwt.verify(token, config.jwt.secret)
    return decode
  }
  decodeToken(token: string): any {
    const decode = jwt.decode(token)
    return decode
  }
}
export default new JWT()