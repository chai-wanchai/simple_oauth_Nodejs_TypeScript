export interface IToken {
  uid: string,
  jti: string,
  typ: string,
  iat: number,
  exp: number,
  sub: any,
  client_id: string
  [key: string]: any
}