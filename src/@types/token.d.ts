export interface IToken {
  uid: string,
  jti: string,
  typ: string,
  iat: number,
  exp: number,
  sub: number,
  client_id: string
  [key: string]: any
}