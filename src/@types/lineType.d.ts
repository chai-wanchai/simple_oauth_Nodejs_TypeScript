export interface LineProfile {
  userId: string,
  displayName: string,
  pictureUrl: string,
  statusMessage: string
}
export interface LineVerifyResp {
  iss: string,
  sub: string,
  aud: string,
  exp: number,
  iat: number,
  nonce: string,
  amr: Array<any>,
  name: string,
  picture: string,
  email: string
}