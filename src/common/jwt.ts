import * as jwt from 'jsonwebtoken'
export class JWT {
  encodeToken(payload: object,Option?:jwt.SignOptions): string {
    const payloads = {
      ...payload,
      iat: Math.floor(Date.now() / 1000) - 30
    }
    const option: jwt.SignOptions = {
      expiresIn: '1d',
      ...Option
    }
    const token = jwt.sign(payloads, `${process.env.JWT_SECRET}`,option)
    return token
  }
  verifyToken(token: string): object | string {
    const decode = jwt.verify(token, `${process.env.JWT_SECRET}`)
    return decode
  }
  decodeToken(token: string): any {
    const decode = jwt.decode(token)
    return decode
  }
}
export default new JWT()